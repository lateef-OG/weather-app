import {
  FETCH_WEATHER_DATA,
  LOADING_STATE,
  SET_TEMP_FORMAT,
} from "../../actions/actionTypes";

const initialState = {
  city: null,
  weather: [],
  temperatureFormat: "imperial",
  loading: false,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_WEATHER_DATA:
      return {
        ...state,
        city: action.payload.city,
        weather: action.payload.weather,
      };
    case SET_TEMP_FORMAT:
      return {
        ...state,
        temperatureFormat: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
