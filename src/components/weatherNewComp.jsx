import { useEffect, useState } from "react";
const WeatherNewComponent = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState();
  async function getweatherData() {
    let API_Key = "78307b4c5df8d645d8a56c56133aaf45";
    let response = await fetch(
      // `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_Key}`
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}`
    );
    let result = await response.json();

    if (result.cod !== "400") {
      setWeatherData(result);
    }
    console.log(result);
  }
  useEffect(() => {
    getweatherData();
  }, [cityName]);
  console.log("City Name:", cityName);
  // getweatherData();
  function convertToCelcius(temp) {
    let newTemp = temp - 273;
    return Math.floor(newTemp);
  }
  return (
    <>
      <h1>Weather App:</h1>
      <p>Enter City:</p>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      {weatherData && (
        <div style={{ padding: "10px" }}>
          <h3>City Name: {weatherData.name}</h3>
          <h3>Country : {weatherData?.sys?.country} </h3>

          {/* . Here we are using conditionally "?" 
              .  Back ticks used so that we can use variable inside that 
          */}
          <h3>
            Description:{" "}
            {weatherData.weather && weatherData.weather[0].description}
            {""}
          </h3>
          {weatherData.weather && (
            <img src={`${weatherData?.weather[0].icon}.svg`} alt="img" style={{width:"80px", height: "80px"}}/>
          )}
          <h3>
            Temperature: {convertToCelcius(weatherData?.main?.temp)} Celcius
          </h3>
        </div>
      )}
    </>
  );
};

export default WeatherNewComponent;
