import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from "react-bootstrap";

function App() {
  const [userCurrency, setUserCurrency] = useState(0)
  const [convertedCurrency, setConvertedCurrency] = useState(0)
  const [userCurrencyType, setUserCurrencyType] = useState("")
  const [convertedCurrencyType, setConvertedCurrencyType] = useState("")
  const currencyTypeOptions = [
    "",
    "US",
    "CAN"
  ]

  function handleClick() {
    console.log(userCurrency)
    console.log(userCurrencyType)
    console.log(convertedCurrencyType)
    setConvertedCurrency(1)
  }

  return (
    <div className="App">
      <p>
        Currency Converter
      </p>
      <header className="App-header">
        <Container>
          <Row>
            <Col>
              <label>
                Select User Currency Type:
              </label>
              <br />
              <Form.Control
                id="userCurrencyTypeSelect"
                as="select"
                value={userCurrencyType}
                onChange={e => setUserCurrencyType(e.target.value)}
              >
                {currencyTypeOptions.map((opt) =>{
                  return <option key={opt} value={opt}>{opt}</option>
                })}
              </Form.Control>
            </Col>
            <Col>
              <label>
                Input User Currency:
              </label>
              <br />
              <input
                id="userCurrencyInput"
                type="number"
                onChange={e => setUserCurrency(e.target.value)}
                value={userCurrency}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <label>
                Select Currency Type To Convert to:
              </label>
              <br />
              <Form.Control
                id="convertedCurrencyTypeSelect"
                as="select"
                value={convertedCurrencyType}
                onChange={e => setConvertedCurrencyType(e.target.value)}
              >
                {currencyTypeOptions.map((opt) =>{
                  return <option key={opt} value={opt}>{opt}</option>
                })}
              </Form.Control>
            </Col>
            <Col>
              <label>
                Click to Convert:
              </label>
              <br />
              <button
                id="convertButton"
                onClick={handleClick}
              >
                CONVERT
              </button>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <label id="convertedCurrencyDisplay">
                {`Converted Currency: ${convertedCurrency}`}
              </label>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
