import reducer from "./weather.reducer";
import * as actions from "../../actions/actionTypes";

describe("weather reducer", () => {
  it("should handle FETCH_WEATHER_DATA", () => {
    const data = {
      city: {
        name: "Lagos",
      },
      weather: [
        {
          date: "2021-05-06",
        },
      ],
    };
    const action = {
      type: actions.FETCH_WEATHER_DATA,
      payload: data,
    };
    expect(reducer({}, action).city).toEqual(data.city);
    expect(reducer({}, action).weather).toEqual(data.weather);
  });

  it("should handle LOADING_STATE", () => {
    const action = {
      type: actions.LOADING_STATE,
      payload: true,
    };
    expect(reducer({}, action).loading).toEqual(true);
  });
  
  it("should handle SET_TEMP_FORMAT", () => {
    const action = {
      type: actions.SET_TEMP_FORMAT,
      payload: "celsius",
    };
    expect(reducer({}, action).temperatureFormat).toEqual("celsius");
  });
});
