import React from "react";
import styled from 'styled-components';

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

const Input = styled.input`
  border: 1px solid black;
  border-radius: 2rem;
  color: black;
  font-size: 1rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
`;
//or should we just route people to signup page?
// if (!username || !password) {
// 	alert('Please enter correct username or password!')
// }

// const Login = ({ handleAddTask }) => {
//   const [input, setInput] = useState('');

//   const handleSubmit = () => {
//     const content = input.trim();
//     if (!content) {
// 			return alert('Please enter correct username or password!');
// 		}
//     handleAddTask(content);
//     setInput('');
//   };
// // }

function LogIn() {
	return (
		<>
		
      <Header>
        <Container>
          <Title>Scrummy</Title>
        </Container>
      </Header>
			<Card>
				<Input className="loginbox" type="text" placeholder="User Name" />
				<Input type="password" placeholder="Password" />
				<Button>LOGIN</Button>
				<Button>SIGNUP</Button>
			</Card>
			
		</>
	)
}

export default LogIn;