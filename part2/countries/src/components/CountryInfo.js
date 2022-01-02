import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
	const [weatherData, setWeatherData] = useState({});
	const ACCESS_KEY = process.env.REACT_APP_API_KEY;
	console.log(ACCESS_KEY);

	useEffect(() => {
		const ACCESS_KEY = process.env.REACT_APP_API_KEY;
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${country.capital.toLowerCase()}&units=m`
			)
			.then(response => {
				console.log(response.data);
				const temp = response.data.current.temperature;
				const imgSrc = response.data.current.weather_icons[0];
				const imgAlt = response.data.current.weather_descriptions[0];
				const windSpeed = response.data.current.wind_speed;
				const windDir = response.data.current.wind_dir;

				const weatherObj = {
					temp: temp,
					imgSrc: imgSrc,
					imgAlt: imgAlt,
					windSpeed: windSpeed,
					windDir: windDir,
				};
				setWeatherData(weatherObj);
			});
	}, []);

	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>

			<h3>Languages:</h3>
			<ul>
				{country.languages.map(lang => (
					<li key={lang.iso639_2}>{lang.name}</li>
				))}
			</ul>
			<img
				src={country.flag}
				width="200"
				alt={`The ${country.demonym} flag.`}
			/>

			<h3>Weather in {country.capital}</h3>
			<p>
				<span className="emphasize">Temperature:</span> {weatherData.temp}{" "}
				Celcius
			</p>
			<img src={weatherData.imgSrc} width="50" alt={weatherData.imgAlt} />
			<p>
				<span className="emphasize">Wind:</span> {weatherData.windSpeed} mph
				direction {weatherData.windDir}
			</p>
		</div>
	);
};

export default CountryInfo;
