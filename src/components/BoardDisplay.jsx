import React from 'react';

export default function BoardDisplay(props){
  const { handleChooseBoard, handleDeleteTask, boardName }= props;
  return(
    <div className='boardCard'>
      <div>{boardName}</div>
    </div>
  )
}