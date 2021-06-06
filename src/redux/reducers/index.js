import { combineReducers } from "redux";
import weatherReducer from "./weather/weather.reducer";

export const reducer = combineReducers({
    weather: weatherReducer,
})