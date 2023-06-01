import React, { useState, useEffect, Children } from 'react';
import { socket } from './socket';
import OnlineUsers from './components/OnlineUsers';
import CreateCard from './components/CreateCard';
import Column from './components/Column';
import styled from 'styled-components';


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  background-color: #ffffff;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.05) 0.1em,
      transparent 0.1em
    ),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0.1em, transparent 0.1em);
  background-size: 0.7em 0.7em;
  border-bottom: 2px solid black;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: 'Abril Fatface', cursive;
  font-size: 2.2rem;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const HEADERS = ['To Do', 'In Progress', 'Complete', 'Reviewed'];

//in login page, socket.emit('logged-in', MongoID for user)

const App = () => {
  const [tasks, setTasks] = useState([[], [], [], []]);
  const [allUsers, setAllUsers] = useState({});
  const [user, setUser] = useState();

  useEffect(() => {
    function onLoadTasks(tasks) {
      console.log('ON LOAD TASKS');
      console.log(tasks);
      setTasks(() => tasks);
    }

    function onUserConnectedToBoard(usersObj) {
      setAllUsers(usersObj);
      setUser(usersObj[socket.id]);
    }

    function onUserDisconnected(socketId) {
      setAllUsers((allUsers) => {
        delete allUsers[socketId];
        return allUsers;
      });
    }

    function onAddTask(newTask) {
      setTasks((tasks) => {
        const newTasks = structuredClone(tasks);
        newTasks[0].push(newTask);
        return newTasks;
      });
    }

    function onDeleteTask(uuid) {
      setTasks((tasks) => {
        let newTasks = structuredClone(tasks);
        return newTasks.map((column) =>
          column.filter((task) => task.uuid !== uuid)
        );
      });
    }

    function onMoveTaskLeft(uuid) {
      setTasks((tasks) => {
        let newTasks = structuredClone(tasks);
        let foundTask = null;
        let foundColumnIndex;
        // find the task with the matching UUID and its current column index
        for (let i = 0; i < newTasks.length; i++) {
          // store current column
          const column = newTasks[i];
          // store index if uuid is found
          const taskIndex = column.findIndex((task) => task.uuid === uuid);

          // if match was found and in the last column (REVIEWED)...
          if (taskIndex !== -1 && i == newTasks.length - 1) {
            // remove the task at the specified index from the column array
            foundTask = column.splice(taskIndex, 1)[0];
            // delete the reviewer
            delete foundTask.reviewedBy;
            foundColumnIndex = i;
            break;
          }
          // if match was found and not in the first column...store result and column index
          else if (taskIndex !== -1 && i !== 0) {
            // remove the task at the specified index from the column array
            foundTask = column.splice(taskIndex, 1)[0];
            foundColumnIndex = i;
            break;
          }
        }
        if (foundTask !== null) {
          // push foundTask into previous column in storage
          newTasks[foundColumnIndex - 1].push(foundTask);
        }
        return newTasks;
      });
    }

    function onMoveTaskRight({ uuid, reviewerId }) {
      setTasks((tasks) => {
        let newTasks = structuredClone(tasks);
        let foundTask = null;
        let foundColumnIndex;
        // find the task with the matching UUID and its current column index
        for (let i = 0; i < newTasks.length; i++) {
          // store current column
          const column = newTasks[i];
          // store index if uuid is found
          const taskIndex = column.findIndex((task) => task.uuid === uuid);

          // if match was found and in the 2nd to last column (COMPLETE)...
          if (taskIndex !== -1 && i === newTasks.length - 2) {
            // remove the task at the specified index from the column array
            foundTask = column.splice(taskIndex, 1)[0];
            // create a current reviewer in storage
            console.log('##### REVIEWED BY ######');
            console.log(reviewerId);
            foundTask.reviewedBy = allUsers[reviewerId];
            foundColumnIndex = i;
            break;
          }
          // if match was found and not in the last column...
          else if (taskIndex !== -1 && i !== newTasks.length - 1) {
            // remove the task at the specified index from the column array
            foundTask = column.splice(taskIndex, 1)[0];
            foundColumnIndex = i;
            break;
          }
        }
        if (foundTask !== null) {
          // push foundTask into next column in storage
          newTasks[foundColumnIndex + 1].push(foundTask);
        }
        return newTasks;
      });
    }

    // Register event listeners
    socket.on('load-tasks', onLoadTasks);
    socket.on('user-connected', onUserConnected);
    socket.on('user-disconnected', onUserDisconnected);
    socket.on('add-task', onAddTask);
    socket.on('delete-task', onDeleteTask);
    socket.on('move-task-left', onMoveTaskLeft);
    socket.on('move-task-right', onMoveTaskRight);

    // Clean up the event listeners when the component unmounts
    // (prevents duplicate event registration)
    return () => {
      socket.off('load-tasks', onLoadTasks);
      socket.off('user-connected-to-board', onUserConnectedToBoard);
      socket.off('user-disconnected', onUserDisconnected);
      socket.off('add-task', onAddTask);
      socket.off('delete-task', onDeleteTask);
      socket.off('move-task-left', onMoveTaskLeft);
      socket.off('move-task-right', onMoveTaskRight);
    };
  }, [allUsers]);

  function handleAddTask(content) {
    socket.emit('add-task', content);
  }

  function handleDeleteTask(uuid) {
    socket.emit('delete-task', uuid);
  }

  function handleMoveTaskLeft(uuid) {
    socket.emit('move-task-left', uuid);
  }

  function handleMoveTaskRight(uuid) {
    socket.emit('move-task-right', uuid);
  }

  return (
    <main>
      <Header>
        <Container>
          <Title>Scrummy</Title>
          <CreateCard handleAddTask={handleAddTask} />
        </Container>
        <OnlineUsers onlineUsers={Object.values(allUsers)} user={user} />
      </Header>
      <Board>
        {tasks.map((columnTasks, i) => (
          <Column
            key={`col_${i}`}
            header={HEADERS[i]}
            columnTasks={columnTasks}
            handleDeleteTask={handleDeleteTask}
            handleMoveTaskLeft={handleMoveTaskLeft}
            handleMoveTaskRight={handleMoveTaskRight}
            disableLeft={i === 0}
            disableRight={i === tasks.length - 1}
          />
        ))}
      </Board>
    </main>
  );
};

export default App;
