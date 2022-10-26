import { faMinus, faGauge, faEye, faWind, faDroplet, faSun, faArrowUp, faArrowDown, faTemperatureThreeQuarters, faTemperatureQuarter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootObject } from "../models.ts/model"

interface Props {
    weather: RootObject,
    onClose : () => void,
    children? : React.ReactNode
}

export function CityWeather (props: Props) {


    const iconSrc = "http://openweathermap.org/img/wn/"+props.weather.weather[0].icon+"@2x.png"

    let color = ''

    if (props.weather.weather[0].description == 'few clouds') {
         color = require('../images/fewclouds.jpg')
    }
    
    else if(props.weather.weather[0].description == 'broken clouds') {
        color = require('../images/clouds.jpg')
    }
    else if(props.weather.weather[0].description == 'scattered clouds') {
        color = require('../images/clouds.jpg')
    }
    else if(props.weather.weather[0].description == 'shower rain') {
        color = require('../images/rain.jpg')
    }
    else if(props.weather.weather[0].description == 'rain') {
        color = require('../images/rain2.jpg')
    }
    else if(props.weather.weather[0].description == 'mist') {
        color = require('../images/mist.jpg')
    }
    else if(props.weather.weather[0].description == 'thunderstorm') {
        color = require('../images/storm.jpg')
    }
    else if(props.weather.weather[0].description == 'snow') {
        color = require('../images/snow.jpg')
    }
    else if(props.weather.weather[0].description == 'clear sky') {
        color = require('../images/clear.jpg')
    }
    else if(props.weather.weather[0].description.includes('clouds')) {
        color = require('../images/clouds.jpg')
    }
    else if(props.weather.weather[0].description.includes('rain')) {
        color = require('../images/rain2.jpg')
    }
    else if(props.weather.weather[0].description.includes('fog')) {
        color = require('../images/fog.jpg')
    }

    function CalculateDate(unix_timestamp: number) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    const dispatch = useDispatch()

    const CloseCity = (city: RootObject) => {
        dispatch({type: "CLOSE_CITY", payload: city.id})
        dispatch({type: "CLOSE_DAYS", payload: city.id})
        props.onClose()
    }




    return (
        
        <div className="city" style={{backgroundImage: `url(${color})`}}>   
            <div className="flex justify-between items-center mb-6">
                <p className="font-bold text-xl">{props.weather.name}, {props.weather.sys.country}</p>
                <button onClick={() => CloseCity(props.weather)}>
                    <FontAwesomeIcon className="qwer mr-1 text-white h-[25px]" icon={faMinus}/>
                </button>
            </div>
            <div className="flex justify-between px-4 my-2 items-center">
                <div className="flex ">
                    <p className="m my-auto font-bold text-6xl">{Math.round(props.weather.main.temp - 273.15)}°C</p>
                    <img src={iconSrc} alt="" className="w-[60px]"/>
                </div>
            
                <div className="rame py-2 px-6">
                    <p>{props.weather.weather[0].description}</p>
                    <p>feels like: {Math.round(props.weather.main.feels_like - 273.15)}°C</p>
                </div>
            </div>
            <div className="line"></div>
            <div className="minies flex justify-between px-4 ">
                <div className="flex items-center">
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1" icon={faWind}/>
                    <p>{props.weather.wind.speed}mps.</p>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1" icon={faGauge}/>
                    <p>{props.weather.main.pressure}mom.</p>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1" icon={faDroplet}/>
                    <p>{props.weather.main.humidity}%</p>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1" icon={faEye}/>
                    <p>{props.weather.visibility}ms.</p>
                </div>
            </div>
            <div className="temps flex justify-between px-[30%] mt-12 ">
                <div className="flex items-center">
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1 h-[31px]" icon={faTemperatureQuarter}/>
                    <p className="font-bold">{Math.round(props.weather.main.temp_min - 273.15)}°C</p>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1 h-[30px]" icon={faTemperatureThreeQuarters}/>
                    <p className="font-bold">{Math.round(props.weather.main.temp_max - 273.15)}°C</p>
                </div>
            </div>
            <div className="line"></div>
            <div className="sun flex justify-between  mt-2 mb-2">
                <div className="flex items-center">
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1 h-[25px]" icon={faArrowUp}/>
                    <FontAwesomeIcon className="qwer text-yellow-300 mr-1 h-[30px]" icon={faSun}/>
                    <p className="font-bold">{CalculateDate(props.weather.sys.sunrise)}</p>
                </div>
                <img className="earth h-[100px]" src={require('../images/worldwide.png')} alt="" />
                <div className="flex items-center">
                <p className="font-bold">{CalculateDate(props.weather.sys.sunset)}</p>
                    <FontAwesomeIcon className="qwer text-yellow-300 mr-1 h-[30px] ml-1" icon={faSun}/>
                    <FontAwesomeIcon className="qwer text-gray-700 mr-1 h-[25px]" icon={faArrowDown}/>
                </div>
            </div>
            <div className="line"></div>
            <div className="days flex">
                {props.children}
            </div>
            
            
        </div>
    )
}
