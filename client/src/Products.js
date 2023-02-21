import './Products.css';
import './App.css';
import React, {Component, useState, useEffect} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button, Form, Modal, Row, Col, ListGroup, useAccordionButton, InputGroup } from 'react-bootstrap';

const Products = () => {

  const [listOfProducts, setListOfProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState('');
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState(0)
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date())
  const handleClose = () => setShow(false);
  const handleShow = (productId) => {
    setShow(true);
    setProductId(productId);
  };
  
  useEffect(()=> {
  Axios.get("http://192.168.1.111:3001/getProducts").then((response)=>{
  setListOfProducts(response.data);
  });
  }, []);
  
  const createProduct = () => {
  Axios.post("http://192.168.1.111:3001/createProduct", {
  name: name,
  description: description,
  stock: stock,
  price: price,
  category: category,
  date: date,
  }).then((response)=>{
  setListOfProducts([...listOfProducts, {
  name,
  description,
  stock,
  price,
  category,
  date,
  },
  ]);
  });
  };
  
  const updateProduct = () => {
    Axios.put(`http://192.168.1.111:3001/updateProduct/${productId}`, {
    name: name,
    description: description,
    stock: stock,
    price: price,
    category: category,
    date: date,
    }).then((response)=>{
    setListOfProducts([...listOfProducts, {
    name,
    description,
    stock,
    price,
    category,
    date,
    },
    ]);
    });
    handleClose();
    };
  
  const deleteProduct = (productId) => {
    Axios
      .delete(`http://192.168.1.111:3001/deleteProduct/${productId}`)
      .then((response) => {
        console.log(response);
        setListOfProducts(listOfProducts.filter((product) => product._id !== productId));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  
  
  
  
  const ProductCard = ({ id, name, stock, description, price, category, date }) => (
  
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="https://static.thenounproject.com/png/3658249-200.png" />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>ID: {id}</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>description: {description}</ListGroup.Item>
      <ListGroup.Item>stock: {stock}</ListGroup.Item>
      <ListGroup.Item>price: {price}</ListGroup.Item>
      <ListGroup.Item>category: {category}</ListGroup.Item>
      <ListGroup.Item>date: {date}</ListGroup.Item>
    </ListGroup>
    <Card.Body>
  
        
      <Button type="button" variant="primary" onClick={() => handleShow(id)}>Edit</Button>
      <Button type="button" variant="danger" onClick={() => deleteProduct(id)}>Delete</Button>
  
//test    
  
  
  
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
              <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
  <Container>
  {listOfProducts.map((product) => {
  return (
   <Row>
    <Col>
      <ProductCard
          name={product.name}
          stock={product.stock}
          description={product.description}
          price={product.price}
          category={product.category}
          date={product.date}
          id={product._id} /> 
            <Modal enforceFocus={false} show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Product management</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomname">
            <Form.Label>name</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="name"
                aria-describedby="inputGroupPrepend"
                required
                onChange={(event)=>{setName(event.target.value);}}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
  
          <Form.Group as={Col} md="6" controlId="formGriddescription">
            <Form.Label>description</Form.Label>
            <Form.Control required type="description" placeholder="description" onChange={(event)=>{setDescription(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
                Please choose a description.
              </Form.Control.Feedback>
          </Form.Group>
  
        </Row>
        <Row className="mb-3">
  
        <Form.Group as={Col} md="6" controlId="stockValidation">
            <Form.Label>stock</Form.Label>
            <Form.Control type="stock" placeholder="stock" required onChange={(event)=>{setStock(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid stock.
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>price</Form.Label>
            <Form.Control type="number" placeholder="price" required onChange={(event)=>{setPrice(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid price.
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group as={Col} md="3" controlId="categoryValidation">
            <Form.Label>category</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(event)=>{setCategory(event.target.value);}}>
              <option>Mobilieji telefonai</option>
              <option>Kompiuteriai</option>
              <option>Televizoriai</option>
              <option>Skalbimo masinos</option>
              <option>Virykles</option>
              <option>Saldytuvai</option>
              <option>Kita</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please provide a valid category.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="dateValidation">
            <Form.Label>date</Form.Label>
            <Form.Control type="date" placeholder="date" required onChange={(event)=>{setDate(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid date.
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
            <Button type="submit" variant="primary" onClick={updateProduct}>
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
          <Form.Group as={Col} md="6" controlId="validationCustomname">
            <Form.Label>name</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="name"
                aria-describedby="inputGroupPrepend"
                required
                onChange={(event)=>{setName(event.target.value);}}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
  
          <Form.Group as={Col} md="6" controlId="formGriddescription">
            <Form.Label>description</Form.Label>
            <Form.Control required type="description" placeholder="description" onChange={(event)=>{setDescription(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
                Please choose a description.
              </Form.Control.Feedback>
          </Form.Group>
  
        </Row>
        <Row className="mb-3">
  
        <Form.Group as={Col} md="6" controlId="stockValidation">
            <Form.Label>stock</Form.Label>
            <Form.Control type="stock" placeholder="stock" required onChange={(event)=>{setStock(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid stock.
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>price</Form.Label>
            <Form.Control type="number" placeholder="price" required onChange={(event)=>{setPrice(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid price.
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group as={Col} md="3" controlId="categoryValidation">
            <Form.Label>category</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(event)=>{setCategory(event.target.value);}}>
            <option>Mobilieji telefonai</option>
              <option>Kompiuteriai</option>
              <option>Televizoriai</option>
              <option>Skalbimo masinos</option>
              <option>Virykles</option>
              <option>Saldytuvai</option>
              <option>Kita</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please provide a valid category.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="dateValidation">
            <Form.Label>date</Form.Label>
            <Form.Control type="date" placeholder="date" required onChange={(event)=>{setDate(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid date.
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
        <Button type="submit" variant="success" onClick={createProduct}>Create Product</Button>
      </Form>
      </div>
  
      </div>
    );
  }
  
  export default Products;
  
