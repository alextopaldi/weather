import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { CityWeather } from './components/CityWeather';
import { Days } from './components/Days';
import { Loading } from './components/Loading';
import { Modal } from './components/Modal';
import { SearchBar } from './components/SearchBar';
import { StartWeather } from './components/StartWeather';
import { UseStartSearch } from './hooks/UseStartSearch';
import { IDays } from './models.ts/dayModel';
import { RootObject } from './models.ts/model';
import {CSSTransition} from "react-transition-group"

function App() {

  const {loading} = UseStartSearch()
  const cities = useSelector((state: any) => state.cities.cities)
  const openCity = useSelector((state: any) => state.cities.city)
  const [modalVision, setModalVision] = useState(false)
  const [localCities, setLocalCities] = useState<RootObject[]>([])
  const days = useSelector((state: any) => state.cities.days)

  const dispatch = useDispatch()
  
  /* useEffect(() => {
    const raw : any = localStorage.getItem('weather') || []
    JSON.parse(raw).map((city : RootObject) => dispatch({type: "ADD_CITY", payload: city}))
  }, [])
  
  useEffect(() => {
    localStorage.setItem('weather', JSON.stringify(cities))
  }, [cities]) */

  function OpenCityHandler() {
    setModalVision(true)
  }

  function CloseCityHandler() {
    setModalVision(false)
  }

  let d = ''
  function FilterDays(day : IDays) {
    if (day.dt_txt.substring(8,10) != d && (day.dt_txt.substring(11,13) == '12')) {
      d = day.dt_txt.substring(8,10)
      return day
    }
  }

  return (
    <div>
      <div className='container'>
        <CSSTransition classNames="my-node" in={modalVision} timeout={500} mountOnEnter unmountOnExit>
          <div>
            {modalVision && 
              <Modal>
                <CityWeather onClose={CloseCityHandler} weather={openCity[0]}>
                  {/* {days[0].map((day : IDays, index: number) => <Days day={day} key={index}/>)} */}
                  {days[0].filter(FilterDays).map((day : IDays, index: number) => <Days day={day} key={index}/>)}
                </CityWeather>
              </Modal>}
          </div>
        </CSSTransition>
        <SearchBar/>
        <div className='examples'>
          {cities.map((city: RootObject) => <StartWeather onOpen={OpenCityHandler} weather={city} key={city.id}/>)}
          
        </div>
        
        {loading && <Loading/>}
      </div>
    </div>
  );
}

export default App;


