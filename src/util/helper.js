import moment from "moment";

export function formatWeatherData(data) {
  let result = [];

  data.forEach((item, index) => {
    let date = item.dt_txt.split(" ")[0];
    let prevDate = data[index - 1]?.dt_txt.split(" ")[0];

    if (prevDate === date) {
      let itemIndex = result.findIndex((entry) => entry.date === date);
      let newResults = [...result];

      newResults[itemIndex] = {
        ...newResults[itemIndex],
        weatherData: newResults[itemIndex].weatherData.push(item),
        chartData: newResults[itemIndex].chartData.push(formatChartData(item)),
      };
    } else {
      result = [
        ...result,
        {
          date,
          weatherData: [item],
          chartData: [formatChartData(item)],
        },
      ];
    }
  });

  return result;
}

function formatChartData(data) {
  const {
    dt_txt,
    main: { temp },
  } = data;
  const dt = dt_txt.split(" ")[1];
  let tempTime = {
    temp: Math.round(temp),
    time: moment(dt, "hh:mm:ss").format("ha"),
  };
  return tempTime;
}

export function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    return {
      latitude,
      longitude,
    };
  }

  function error() {
    return { error: "Unable to retrieve your location" };
  }

  if (!navigator.geolocation) {
    return { error: "Geolocation is not supported by your browser" };
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

export function getLocation() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let coordinates = {
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          };

          resolve(coordinates);
        },
        (error) => reject(error)
      );
    });
  }
}
