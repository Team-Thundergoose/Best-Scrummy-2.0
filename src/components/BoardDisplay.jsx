import React from 'react';
import Board from './Board';

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
