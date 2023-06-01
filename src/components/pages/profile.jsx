import React, { useContext } from 'react';
import { socket } from '../../socket.js';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context.js';

const handleChooseBoard = (boardName) => {
  socket.emit('choose-board', boardName);
};

const Card = styled.div`
  border: 2px solid black;
  background-color: white;
  box-shadow: 5px 5px black;
  margin: auto;
  margin-top: 100px;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.05) 0.1em,
      transparent 0.1em
    ),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0.1em, transparent 0.1em);
  background-size: 0.7em 0.7em;
  width: 450px;
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid black;
  background-color: #a6faff;
  box-shadow: 2px 2px black;
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;
  transform: translate(-2px, -2px);
  &:hover:not([disabled]) {
    transform: translate(0px, 0px);
    box-shadow: 0px 0px;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #d1d5db;
  }
`;

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

const Text = styled.div`
  font-family: 'Abril Fatface', cursive;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 2rem;
  color: black;
  font-size: 1rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
//have button that crates a new board with blank state linked to user name
//then you can join that board

//redireced here if signed in alreday

//form for new board

//fetch user boards

function Profile() {
  const ctx = useContext(AuthContext);
  console.log(ctx.user);
  return (
    <>
      <Header>
        <Container>
          <Title>Welcome {ctx.user.username}</Title>
        </Container>
      </Header>
      <Board>
        <Card>
          <div>
            <Text>Join Your Team</Text>
            <Input
              className="loginbox"
              type="text"
              placeholder="#Board Number/ Name"
            />
          </div>
          <>
            <Button>'active boards'</Button>
          </>
          <Button>
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
            </svg>
          </Button>
        </Card>
      </Board>
    </>
  );
}

export default Profile;
