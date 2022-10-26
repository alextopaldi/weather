import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IDays } from "../models.ts/dayModel"
import { RootObject } from "../models.ts/model"

export function UseStartSearch() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    async function startSearch() {
        try {
          setLoading(true)
          const response1 = await axios.get<RootObject>('https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=bb48884ac384468dc76933069f6e8b37')
          const response2 = await axios.get<RootObject>('https://api.openweathermap.org/data/2.5/weather?q=London&appid=bb48884ac384468dc76933069f6e8b37')
          const response3 = await axios.get<RootObject>('https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=bb48884ac384468dc76933069f6e8b37')
          
        
          setLoading(false)
      
          dispatch({type: "ADD_CITY", payload: response1.data})
          dispatch({type: "ADD_CITY", payload: response2.data})
          dispatch({type: "ADD_CITY", payload: response3.data})
          
        } catch (error) {
          console.log(error)
        }
        
      }
      useEffect( () => {
        startSearch()
      }, [])

      return {loading}
}