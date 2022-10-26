import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootObject } from "../models.ts/model"
import { StartWeather } from "./StartWeather"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function SearchBar() {

    const dispatch = useDispatch()
    
    
    const [data, setData] = useState<RootObject>()
    const [city, setCity] = useState('')

    async function weatherSearch() {
        try {
          const response = await axios.get<RootObject>('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=bb48884ac384468dc76933069f6e8b37')
          setData(response.data)
          dispatch({type: "ADD_CITY", payload: response.data})
          setCity('')
        } catch (error) {
          console.log(error)
        }
        
      }
    return(
        <div className='searchBar'>
          <input className='mainInp' type="text" placeholder='Enter a city...' value={city} onChange={(e)=> setCity(e.target.value)} />
          <button className='submitBtn flex justify-center items-center ' onClick={weatherSearch}>
            <FontAwesomeIcon className="qwer text-white h-[15px]" icon={faMagnifyingGlass}/>
          </button>
          {/* {cities.map((city: RootObject) => <StartWeather weather={city} key={city.id}/>)} */}
        </div>
    )
}