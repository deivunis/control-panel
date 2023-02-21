//import logo from './logo.svg';
import './App.css';
import React, {Component, useState, useEffect} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button, Form, Modal, Row, Col, ListGroup, useAccordionButton, InputGroup } from 'react-bootstrap';
//import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom'
//import Products from './Products';

const Users = () => {

const [listOfUsers, setListOfUsers] = useState([]);
const [show, setShow] = useState(false);
const [userId, setUserId] = useState('');
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [email, setEmail] = useState("")
const [age, setAge] = useState(0)
const [sex, setSex] = useState("")
const handleClose = () => setShow(false);
const handleShow = (userId) => {
  setShow(true);
  setUserId(userId);
};

useEffect(()=> {
Axios.get("http://192.168.1.111:3001/getUsers").then((response)=>{
setListOfUsers(response.data);
});
}, []);

const createUser = () => {
Axios.post("http://192.168.1.111:3001/createUser", {
username: username,
password: password,
email: email,
age: age,
sex: sex,
}).then((response)=>{
setListOfUsers([...listOfUsers, {
username,
password,
email,
age,
sex,
},
]);
});
};

const updateUser = () => {
  Axios.put(`http://192.168.1.111:3001/updateUser/${userId}`, {
  username: username,
  password: password,
  email: email,
  age: age,
  sex: sex,
  }).then((response)=>{
  setListOfUsers([...listOfUsers, {
  username,
  password,
  email,
  age,
  sex,
  },
  ]);
  });
  handleClose();
  };

const deleteUser = (userId) => {
  Axios
    .delete(`http://192.168.1.111:3001/deleteUser/${userId}`)
    .then((response) => {
      console.log(response);
      setListOfUsers(listOfUsers.filter((user) => user._id !== userId));
    })
    .catch((err) => {
      console.error(err);
    });
};





const UserCard = ({ id, username, email, password, age, sex }) => (

  <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg" />
  <Card.Body>
    <Card.Title>{username}</Card.Title>
    <Card.Text>
      Tai yra papildoma vartotojo informacija;
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroup.Item>Password: {password}</ListGroup.Item>
    <ListGroup.Item>Email: {email}</ListGroup.Item>
    <ListGroup.Item>Age: {age}</ListGroup.Item>
    <ListGroup.Item>Sex: {sex}</ListGroup.Item>
    <ListGroup.Item>ID: {id}</ListGroup.Item>
  </ListGroup>
  <Card.Body>

      
    <Button type="button" variant="primary" onClick={() => handleShow(id)}>Edit</Button>
    <Button type="button" variant="danger" onClick={() => deleteUser(id)}>Delete</Button>

  



  </Card.Body>
</Card>
);

const [validated, setValidated] = useState(false);

const handleSubmit = (event) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  setValidated(true);
};

  return (
    <div className="App">
<Container>
{listOfUsers.map((user) => {
return (
 <Row>
  <Col>
    <UserCard
        username={user.username}
        email={user.email}
        password={user.password}
        age={user.age}
        sex={user.sex}
        id={user._id} /> 
          <Modal enforceFocus={false} show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>User management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(event)=>{setUsername(event.target.value);}}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value);}}/>
          <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Row className="mb-3">

      <Form.Group as={Col} md="6" controlId="emailValidation">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" required onChange={(event)=>{setEmail(event.target.value);}}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Age" required onChange={(event)=>{setAge(event.target.value);}}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid age.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="sexValidation">
          <Form.Label>Sex</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(event)=>{setSex(event.target.value);}}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid sex.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree for correct information"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Col>
</Row>

);
})}
</Container>
<div class="kontikas">
<Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(event)=>{setUsername(event.target.value);}}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value);}}/>
          <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Row className="mb-3">

      <Form.Group as={Col} md="6" controlId="emailValidation">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" required onChange={(event)=>{setEmail(event.target.value);}}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Age" required onChange={(event)=>{setAge(event.target.value);}}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid age.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="sexValidation">
          <Form.Label>Sex</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(event)=>{setSex(event.target.value);}}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid sex.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree for correct information"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit" variant="success" onClick={createUser}>Create User</Button>
    </Form>
    </div>

    </div>
  );
}

export default Users;
