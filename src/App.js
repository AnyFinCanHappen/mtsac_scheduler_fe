import React from 'react';
import SearchForm from "./search/SearchForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./css/column.css"

function App() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            Schedule, implement soon.
          </Col>
          <Col className = "column-scroll">
            <SearchForm/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
