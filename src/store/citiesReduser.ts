import { IDays } from '../models.ts/dayModel';
import { RootObject } from '../models.ts/model';

interface IDefaultState {
    cities: RootObject[],
    city : RootObject[],
    days : IDays[]
}

const defaultState: IDefaultState = {
    cities : [],
    city: [],
    days: []
  }

  export const reduser = (state = defaultState, action: { type: any; payload: any; }) => {
    switch(action.type) {
      case "ADD_CITY":
        return {...state, cities: [action.payload, ...state.cities]}
      case "REMOVE_CITY":
        return {...state, cities: state.cities.filter((city: RootObject) => city.id != action.payload)}
      case "CLOSE_CITY":
        return {...state, city: []}
      case "OPEN_CITY":
        return {...state, city: [...state.city, action.payload]}
      case "ADD_DAYS":
        return {...state, days: [...state.days, action.payload]}
      case "CLOSE_DAYS":
        return {...state, days: []}
      default: 
      return state
    }
  }