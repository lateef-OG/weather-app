import * as actions from "./weather.actions";
import * as types from "../actionTypes";

describe("actions", () => {
  it("should create an action to get weather data", () => {
    const data = {
        city: {},
        weather: []
    };
    const expectedAction = {
      type: types.FETCH_WEATHER_DATA,
      payload: data,
    };
    expect(actions.getWeatherData(data)).toEqual(expectedAction);
  });
  it("should create an action to set temperature format", () => {
    const format = "celsius";
    const expectedAction = {
      type: types.SET_TEMP_FORMAT,
      payload: format,
    };
    expect(actions.setTempFormat(format)).toEqual(expectedAction);
  });
  it("should create an action to set loading state", () => {
    const state = true;
    const expectedAction = {
      type: types.LOADING_STATE,
      payload: state,
    };
    expect(actions.setLoadingState(state)).toEqual(expectedAction);
  });
});