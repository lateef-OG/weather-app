import React, { useState, useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import BarChartContainer from "../../components/BarChart";
import WeatherCard from "../../components/WeatherCard";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherData,
  setTempFormat,
} from "../../redux/actions/weather/weather.actions";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: "100%",
    flexWrap: "nowrap",
    overflowX: "hidden",
    overflowY: "visible",
  },
  container: {
    padding: "30px 0",
  },
  chartContainer: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    width: "50%",
  },
  loadingContainer: {
    height: "100vh",
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const refArray = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { city, weather, temperatureFormat, loading } = useSelector(
    (state) => state.weather
  );

  const handleNext = () => {
    if (currentIndex < weather.length - 1) {
      let newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      refArray.current[newIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      let newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      refArray.current[newIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchWeatherData(temperatureFormat));
  }, [temperatureFormat, dispatch]);

  return (
    <>
      <Container maxWidth="md">
        {loading && (
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={classes.loadingContainer}
          >
            <CircularProgress />
          </Grid>
        )}
        <Typography component="div">
          <Grid container justify="space-around" className={classes.container}>
            <FormControlLabel
              value="celsius"
              control={<Radio />}
              label="Celsius"
              labelPlacement="start"
              color="primary"
              checked={temperatureFormat === "metric"}
              onChange={() => dispatch(setTempFormat("metric"))}
            />
            <FormControlLabel
              value="fahrenheit"
              control={<Radio />}
              label="Fahrenheit"
              labelPlacement="end"
              color="primary"
              checked={temperatureFormat === "imperial"}
              onChange={() => dispatch(setTempFormat("imperial"))}
            />
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={handleNext}
                disabled={currentIndex === weather.length - 1}
              >
                <ArrowForwardRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container className={classes.cardContainer}>
            {weather.map((day, index) => {
              return (
                <WeatherCard
                  key={day.date}
                  index={index}
                  day={day}
                  city={city.name}
                  temperatureFormat={temperatureFormat}
                  currentIndex={currentIndex}
                  ref={(ref) => {
                    refArray.current[index] = ref;
                  }}
                />
              );
            })}
          </Grid>
          <Grid container justify="center" className={classes.container}>
            <Grid item className={classes.chartContainer}>
              <BarChartContainer data={weather[currentIndex]?.chartData} />
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </>
  );
};

export default Home;
