import { useSelector } from 'react-redux';
import { RootObject } from '../models.ts/model';

/* 
interface IDefaultState {
    city: RootObject
}

function Default() {
    const cities = useSelector((state: any) => state.cities.cities)
    return cities[0]
}

const defaultState: IDefaultState = {
    city : Default()
  } */

/*   export const cityReduser = (state : RootObject, action: { type: any; payload: any; }) => {
    switch(action.type) {
      case "OPEN_CITY":
        return {...state, city : state = action.payload}
      default: 
      return state
    }
  }  */