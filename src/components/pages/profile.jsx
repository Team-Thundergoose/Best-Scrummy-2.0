import React from "react";
import { socket } from '../../socket.js';

//have button that crates a new board with blank state linked to user name
//then you can join that board

//redireced here if signed in alreday

handleChooseBoard = (boardName) => {

	socket.emit('choose-board', boardName);
}

function Profile() {
	return (
		<>
		</>
	)
}
export default Profile;