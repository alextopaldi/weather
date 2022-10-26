import { RootObject } from "../models.ts/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faWind} from "@fortawesome/free-solid-svg-icons"
import {faEye} from "@fortawesome/free-solid-svg-icons"
import {faGauge, faChevronDown} from "@fortawesome/free-solid-svg-icons"
import {faX} from "@fortawesome/free-solid-svg-icons"
import { url } from "inspector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";


interface Props {
    weather: RootObject,
    onOpen : () => void
}

export function StartWeather(props: Props) {
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
    
    
    const dispatch = useDispatch()

    const iconSrc = "http://openweathermap.org/img/wn/"+props.weather.weather[0].icon+"@2x.png"

    const RemoveCity = (city : RootObject) => {
        dispatch({type: "REMOVE_CITY", payload: city.id})
        
    }

    async function OnClickHandler  (city : RootObject) {
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q='+props.weather.name+'&appid=c51891b54837145bf01f86299e73f9a9')
            dispatch({type: "ADD_DAYS", payload: response.data.list})
            dispatch({type: "OPEN_CITY", payload: city})
            props.onOpen()
        } catch (error) {
            console.log(error)
        }
    }

    

    return(
    <div className="example" style={{backgroundImage: `url(${color})`}} >
        <div className="flex justify-between items-center">
            <p className="font-bold">{props.weather.name}, {props.weather.sys.country}</p>
            <button onClick={() => RemoveCity(props.weather)}>
                <FontAwesomeIcon className="close mr-1 text-white h-[15px]" icon={faX}/>
            </button>
        </div>
        <div className="flex justify-between px-4 my-6 items-center">
            <p className="m my-auto font-bold text-4xl">{Math.round(props.weather.main.temp - 273.15)}°C</p>
            <img src={iconSrc} alt="" className="w-[60px]"/>
            <div>
                <p>{props.weather.weather[0].description}</p>
                <p>feels like: {Math.round(props.weather.main.feels_like - 273.15)}°C</p>
            </div>
        </div>
        <div className="flex justify-between px-4 my-6">
            <div className="flex items-center">
                <FontAwesomeIcon className="qwer text-gray-700 mr-1" icon={faWind}/>
                <p>{props.weather.wind.speed}mps.</p>
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon className="qwer text-gray-700 mr-1" icon={faGauge}/>
                <p>{props.weather.main.pressure}mom.</p>
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon className="qwer text-gray-700 mr-1" icon={faEye}/>
                <p>{props.weather.visibility}ms.</p>
            </div>
        </div>
        <div className="flex items-center justify-center">
            <FontAwesomeIcon className="close mr-1 h-[25px]" icon={faChevronDown} onClick={() => OnClickHandler(props.weather)}/>
        </div>
    </div>
    )
}