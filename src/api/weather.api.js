import { getLocation } from "../util/helper";
import { baseUrl } from "./url";

export const getWeather = async (format) => {
  const coord = await getLocation()
    .then((res) => res)
    .catch((err) => null);

  let api_key = process.env.REACT_APP_API_KEY;

  let qs = [`units=${format}`, `appid=${api_key}`];
  if (coord) qs.unshift(`lat=${coord.lat}&lon=${coord.lon}`);
  else qs.unshift("q=Lagos,ng");

  const url = `${baseUrl}/forecast?${qs.join("&")}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("An error occured. Please refresh the page.");
      }
      return res.json();
    })
    .catch((error) => ({ error: error.message }));
};
