import React from "react";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  cardItem: {
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
    minWidth: "33.2%",
    padding: "30px 20px",
  },
  weatherCard: {
    borderRadius: "20px",
    textAlign: "center",
  },
  currentCard: {
    transform: "scaleY(1.2) scaleX(1.1)",
    transition: "0.15s ease-in",
  },
  city: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: "10px",
  },
  day: {
    fontSize: 24,
    lineHeight: "24px",
    fontWeight: 600,
  },
  date: {
    fontSize: 14,
  },
  temp: {
    fontSize: 30,
    fontWeight: 700,
  },
}));

const WeatherCard = React.forwardRef(
  ({ city, day, index, currentIndex, temperatureFormat }, ref) => {
    const classes = useStyles();

    const { date, weatherData } = day;
    const formattedDay = moment(date, "YYYY-MM-DD").format("ddd");
    const formattedDate = moment(date, "YYYY-MM-DD").format("D MMM, YYYY");
    const {
      main: { temp },
      weather,
    } = weatherData[0];
    const description = weather[0].description;

    return (
      <Grid ref={ref} item className={classes.cardItem}>
        <Card
          className={`${classes.weatherCard} ${
            index === currentIndex ? classes.currentCard : ""
          }`}
        >
          <CardContent>
            <Typography className={classes.city}>{city}</Typography>
            <Typography className={classes.day}>{formattedDay}</Typography>
            <Typography className={classes.date}>{formattedDate}</Typography>
            <Typography className={classes.temp}>
              {temp}
              <sup>o</sup>
              {temperatureFormat === "imperial" ? "F" : "C"}
            </Typography>
            <Typography>{description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
);

export default WeatherCard;
