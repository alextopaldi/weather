import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IDays } from "../models.ts/dayModel"


interface DaysProps {
    day: IDays
}


export function Days({day} : DaysProps) {

    const iconSrc = "http://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"

    return (
        <div>
            <div className="day py-2 px-4 flex flex-col justify-center items-center">
                <p>{day.dt_txt.substring(5, 10)}</p>
                <p className="font-bold text-xl">{Math.round(day.main.temp - 273.15)}°C</p>
                <img  src={iconSrc} alt=""/>
            </div>
        </div>
    )
}

function dispatch(arg0: { type: string; payload: any }) {
    throw new Error("Function not implemented.")
}
