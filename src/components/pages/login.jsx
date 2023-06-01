import React from "react";
import styled from 'styled-components';

const loginbox = styled.div`
  border: 2px solid black;
  background-color: white;
  box-shadow: 5px 5px black;
  margin: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.05) 0.1em,
      transparent 0.1em
    ),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0.1em, transparent 0.1em);
  background-size: 0.7em 0.7em;
`;
//or should we just route people to signup page?
// if (!username || !password) {
// 	alert('Please enter correct username or password!')
// }



function LogIn() {
	return (
		<>
			<div className="loginbox">
				<input type="text"/>
				<input type="password" />
			</div>
		</>
	)
}

export default LogIn;