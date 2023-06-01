import React from 'react';

export default function Board(props) {
  const clickHandler = () => {
    props.chosenHandler(props.name);
  };
  return <div onClick={clickHandler}>{props.name}</div>;
}
