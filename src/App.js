import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from "react-bootstrap";

function App() {
  const currentHost = 'http://localhost:8000'
  const [userCurrency, setUserCurrency] = useState(0)
  const [convertedCurrency, setConvertedCurrency] = useState(0)
  const [userCurrencyType, setUserCurrencyType] = useState("")
  const [convertedCurrencyType, setConvertedCurrencyType] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currencyTypeOptions, setCurrencyTypeOptions] = useState([])

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(`${currentHost}/currency_options`)
      .then(res => res.json())
      .then(
        (result) => {
          result.unshift("")
          setCurrencyTypeOptions(result)
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          setHasError(true);
        }
      )
  }, []);

  function handleClick() {
    setIsLoading(true);
    setHasError(false);
    let fetchString =`${currentHost}/convert_currency`
    fetchString = `${fetchString}?userCurrency=${userCurrency}`
    fetchString = `${fetchString}&userCurrencyType=${userCurrencyType}`
    fetchString = `${fetchString}&convertedCurrencyType=${convertedCurrencyType}`
    fetch(fetchString)
      .then(res => res.json())
      .then(
        (result) => {
          setConvertedCurrency(result)
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          setHasError(true);
        }
      )
    setConvertedCurrency(1)
  }

  return (
    <div className="App">
      <p>
        Currency Converter
      </p>
      <header className="App-header">
        <Container>
        {hasError ? (
            <Row>
              <Col>
                <label>
                  There was an error
                </label>
              </Col>
            </Row>
          ) : null}
          {isLoading ? (
            <Row>
              <Col>
                <label>
                  Loading...
                </label>
              </Col>
            </Row>
          ) : null}
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
                {currencyTypeOptions.map((opt) => {
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
          <br />
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
                {currencyTypeOptions.map((opt) => {
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
          <br />
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
