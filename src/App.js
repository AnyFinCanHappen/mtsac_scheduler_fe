import React from 'react';
import './App.css';
import SearchForm from "./search/SearchForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            Schedule, implement soon.
          </Col>
          <Col>
            <SearchForm/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
