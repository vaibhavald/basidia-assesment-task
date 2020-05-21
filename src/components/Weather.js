import React, { useEffect, useState } from 'react';
import { Form,Button ,FormGroup, Media, Image, Container, Row, Col, Card, FormCheck} from 'react-bootstrap';

const Weather = () => {
    const [weather ,setWeather] = useState({city:"",date:"",temp:"",feels_like:"",humidity:"",wind:"",clouds:"",active:false});
    
    const getWeatherReport = async(e) => {
        const city =  e.target.value;
        const api_call  = await  fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=da65eada764bb643cba2efa988e63859");
        const weather_data = await api_call.json();
        //const weather_data  = require("./weather_data.json");
        const months = ["Jan","Feb","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth();
        const today = date +" "+ months[month];
        const temp  = (parseFloat(weather_data.main.temp)-273.1).toFixed(2);
        const feels_like = (parseFloat(weather_data.main.feels_like)-273.1).toFixed(2);
        const humidity  = weather_data.main.humidity;
        const wind =     weather_data.wind.speed;
        const clouds =   weather_data.clouds.all;

        setWeather({
            ...weather,
            date:today,
            temp: temp,
            feels_like: "Feels like "+feels_like,
            humidity:humidity,
            wind:wind,
            city:city,
            clouds:clouds,
            active:true
        })
    }
    const cityList = ["Mumbai", "Delhi", "Chennai", "Bangalore", "Lucknow", "Kolkata", "Allahabad"];
    return (
        <div>
            <div className="bg container-fluid">
                <Row>
                    <Col>
                        <div className="dropdown d-flex justify-content-end">
                            <select class="btn btn-warning dropdown-toggle mt-5" onChange={getWeatherReport}>
                                {
                                    cityList.map(list => (
                                    <option key={list} value={list}>{list}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </Col>
                </Row>
                <div className={((weather.active == false) ? 'd-none' : null)}>
                <Row>
                    <Col className="date_city">
                        <div className="container-fluid d-flex justify-content-start">
                            <h4 className="date">{weather.date}</h4>
                        </div>
                        <div className="container-fluid d-flex justify-content-start">
                            <h1 className="city">{weather.city}&rarr;</h1>
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-start weather-report">
                    <Col className="mt-5">
                        <div>
                            <h1 class="temp">{weather.temp}&deg;C</h1>
                            <h5>{weather.feels_like}&deg;C</h5>
                        </div>
                    </Col>
                    <Col className="mt-5">
                        <div>
                            <h4>Rain</h4>
                            <h4>{weather.clouds}%</h4>
                        </div>
                    </Col>
                    <Col className="mt-5">
                        <div>
                            <h4>Wind</h4>
                            <h4>{weather.wind} km/h</h4>
                        </div>
                    </Col>
                    <Col className="mt-5">
                        <div>
                            <h4>Humidity</h4>
                            <h4>{weather.humidity} %</h4>
                        </div>
                    </Col>
                </Row>
                </div>
            </div>
        </div>
    );
}

export default Weather;