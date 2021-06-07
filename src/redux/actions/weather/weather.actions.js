import { getWeather } from "../../../api"
import { formatWeatherData } from "../../../util/helper"
import { FETCH_WEATHER_DATA, LOADING_STATE, SET_TEMP_FORMAT } from "../actionTypes"

export const getWeatherData = (payload) => {
    return {
        type: FETCH_WEATHER_DATA,
        payload
    }
}

export const setLoadingState = (payload) => {
    return {
        type: LOADING_STATE,
        payload
    }
}

export const setTempFormat = (payload) => {
    return {
        type: SET_TEMP_FORMAT,
        payload
    }
}

export const fetchWeatherData = (format) => async dispatch => {
    dispatch(setLoadingState(true))
    getWeather(format)
    .then(response => {
        dispatch(setLoadingState(false));
        if(response.hasOwnProperty('error')){
            alert(response.error)
        } else {
            const dayList = formatWeatherData(response.list);
            const data = {
                city: response.city,
                weather: dayList,
            }
            dispatch(getWeatherData(data));
        }
    })
}