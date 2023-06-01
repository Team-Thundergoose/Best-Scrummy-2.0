import React from 'react';
import Board from './Board';

// const Board = styled.div`
//   border: 2px solid black;
//   background-color: white;
//   box-shadow: 5px 5px black;
//   margin: 10px;
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   background-image: linear-gradient(
//       rgba(0, 0, 0, 0.05) 0.1em,
//       transparent 0.1em
//     ),
//     linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0.1em, transparent 0.1em);
//   background-size: 0.7em 0.7em;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 1rem;
// `;


export default function BoardDisplay(props) {
  const boardsJSX = props.boardData.map((x, index) => {
    return (
      <Board
        key={index}
        name={x.name}
        chosenHandler={props.handleChooseBoard}
        delete={props.handleDeleteTask}
      ></Board>
    );
  });

  return (
    <div className="boardCard">
      <div>INSIDE BOARD</div>
      <div>{boardsJSX}</div>
    </div>
  );
}
