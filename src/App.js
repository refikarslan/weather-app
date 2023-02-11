import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Container, Col, Row, Table } from "reactstrap";

export default function App() {
  const [city, setCity] = useState("");
  const [state, setState] = useState(false);
  const [info, setInfo] = useState([]);
  const [cast, setCast] = useState(0);

  useEffect(() => console.log(city), [city]);

  //<ListGroupItem> <img src={imagUrl}></img> </ListGroupItem>
  //info, index
  const handleChange = async () => {
    const api = "69213bbcf6dc49b0853193841230502";
    const baseUrl = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${city}&days=3`;

    await axios(baseUrl).then((res) => {
      setInfo(res.data);
    });

    setState(true);
  };
  return (
    <div className="search">
      <Row>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChange();
          }}
        >
          <div className="form">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="inputText"
              type="text"
              placeholder="Enter a location..."
            />
            <button type="submit" className="btn">
              <BiSearchAlt2 className=" " />
            </button>
          </div>
        </form>
      </Row>
      <Container fluid>
        <Row>
          <Col xs="4">
            <div className="city">
              {state ? (
                <div>
                  <ListGroup horizontal>
                    <ListGroupItem style={{ border: "none" }}>
                      <img src={"https:" + info.current.condition.icon}></img>
                      <p>
                        {info.current.temp_c} &deg;C |{" "}
                        {info.current.condition.text}
                        <br />
                        {info.location.name} /{info.location.country}
                        <br />
                        {info.location.localtime}
                      </p>
                    </ListGroupItem>
                    <ListGroupItem style={{ border: "none" }}>
                      <p>
                        Feels Like: {info.current.feelslike_c}&deg;C
                        <br />
                        Temp Min: {info.forecast.forecastday[0].day.mintemp_c}
                        &deg;C
                        <br />
                        Temp Max: {info.forecast.forecastday[0].day.maxtemp_c}
                        &deg;C
                        <br />
                        Daily Chance of Snow: %{" "}
                        {info.forecast.forecastday[0].day.daily_chance_of_snow}
                        <br />
                        Daily Chance of Rain : %{" "}
                        {info.forecast.forecastday[0].day.daily_chance_of_rain}
                        <br />
                        Humidty: %{info.current.humidity}
                      </p>
                    </ListGroupItem>
                  </ListGroup>
                </div>
              ) : null}
            </div>
          </Col>

          <Col xs="8">
            <div className="days">
              {state ? (
                <div>
                  <ListGroup horizontal>
                    {info.forecast.forecastday.map((forecast, index) => (
                      <ListGroupItem
                        style={{ border: "none" }}
                        active={index === cast ? true : false}
                        onClick={(e) => setCast(index)}
                      >
                        <ListGroup flush>
                          <ListGroupItem
                            style={{ border: "none" }}
                            active={index === cast ? true : false}
                            onClick={(e) => setCast(index)}
                          >
                            <img
                              src={"https:" + forecast.day.condition.icon}
                            ></img>
                            {forecast.day.condition.text}{" "}
                            {forecast.day.mintemp_c}&deg;C /{" "}
                            {forecast.day.maxtemp_c} &deg;C
                          </ListGroupItem>
                          <ListGroupItem
                            style={{ border: "none" }}
                            active={index === cast ? true : false}
                            onClick={(e) => setCast(index)}
                          >
                            {info.location.name} / {info.location.country} |{" "}
                            {forecast.date}
                          </ListGroupItem>
                        </ListGroup>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>

        <Row>
          <div className="table">
            {state ? (
              <div>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Temperture °C</th>
                      <th>Condition</th>
                      <th>Wind KM/H</th>
                      <th>Chance of Rain</th>
                      <th>Chance of Snow</th>
                      <th>Humidity</th>
                      <th>Feels Like in °C</th>
                    </tr>
                  </thead>

                  <tbody>
                    {info.forecast.forecastday[cast].hour.map(
                      (hourly, index) => (
                        <tr key={index}>
                          <td>{hourly.time.slice(-5)}</td>
                          <td>
                            {hourly.text}
                            <img
                              src={"https:" + hourly.condition.icon}
                              alt=" "
                            ></img>
                          </td>
                          <td>{hourly.temp_c}&deg;C</td>
                          <td>{hourly.wind_kph}</td>
                          <td>{hourly.chance_of_rain + "%"}</td>
                          <td>{hourly.chance_of_snow + "%"}</td>
                          <td>%{hourly.humidity}</td>
                          <td>{hourly.feelslike_c}&deg;C</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            ) : null}
          </div>
        </Row>
      </Container>
    </div>
  );
}
