import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import CountryInfo from "./components/CountryInfo";

const App = () => {
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState([]);

	// Fetch country data from api
	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then(response => setCountries(response.data))
			.catch(error => console.error(error));
	}, []);

	const handleSearchChange = event => setSearch(event.target.value);

	const countriesToShow =
		search === ""
			? []
			: countries.filter(country =>
					country.name.toLowerCase().includes(search.toLowerCase())
			  );

	return (
		<div>
			find countries <input value={search} onChange={handleSearchChange} />
			<div>
				{countriesToShow.length > 10 ? (
					"Too many matches, specify another filter"
				) : countriesToShow.length === 1 ? (
					<CountryInfo country={countriesToShow[0]} />
				) : (
					countriesToShow.map(country => (
						<div key={country.name}>
							<Country country={country} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default App;
