import React, { useState, useEffect } from "react";
import axios from "axios";
import BreedItem from "./BreedItem";
import "./index.css";

const breedsListApi = "https://dog.ceo/api/breeds/list/all";

function BreedList() {
	const [allBreeds, setAllBreeds] = useState([]);
	const [error, setError] = useState(null);
	const [breedSearch, setBreedSearch] = useState("");
	//fetch the breeds list from dog api
	const getBreedsList = () => {
		axios
			.get(breedsListApi)
			.then(({ data }) => {
				const breedsList = Object.keys(data.message);
				setAllBreeds(breedsList);
			})
			.catch((error) => setError(error));
	};
	useEffect(() => {
		getBreedsList();
	}, []);
	return error ? (
		<div>Error: ${error.message}</div>
	) : (
		<div className="container">
			<h2>Dog List goes here </h2>
			<input
				placeholder="search fav breed..."
				value={breedSearch}
				onChange={(e) => setBreedSearch(e.target.value)}
			/>
			{allBreeds
				.filter((breed) => breed.slice(0, breedSearch.length) === breedSearch)
				.map((breed, idx) => (
					<BreedItem key={idx} breed={breed} />
				))}
		</div>
	);
}

export default BreedList;
