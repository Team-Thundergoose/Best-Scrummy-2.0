

// return (
//     <main>
//       <Header>
//         <Container>
//           <Title>Scrummy</Title>
//           <CreateCard handleAddTask={handleAddTask} />
//         </Container>
//         <OnlineUsers onlineUsers={Object.values(allUsers)} user={user} />
//       </Header>
//       <Board>
//         {tasks.map((columnTasks, i) => (
//           <Column
//             key={`col_${i}`}
//             header={HEADERS[i]}
//             columnTasks={columnTasks}
//             handleDeleteTask={handleDeleteTask}
//             handleMoveTaskLeft={handleMoveTaskLeft}
//             handleMoveTaskRight={handleMoveTaskRight}
//             disableLeft={i === 0}
//             disableRight={i === tasks.length - 1}
//           />
//         ))}
//       </Board>
//     </main>
//   );
// };