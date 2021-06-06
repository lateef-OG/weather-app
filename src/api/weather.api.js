import { getLocation } from "../util/helper";
import { baseUrl } from "./url";

export const getWeather = async (format) => {
  const coord = await getLocation()
    .then((res) => res)
    .catch((err) => null);

  let qs = [`units=${format}`, "APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40"];
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
