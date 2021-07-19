import React, { useState, useEffect } from "react";
import axios from "axios";
import BreedItem from "./BreedItem";
import "./index.css";

//api to fetch list of all breeds
const breedsListApi = "https://dog.ceo/api/breeds/list/all";

function BreedList() {
	const [allBreeds, setAllBreeds] = useState({});
	const [breedsList, setBreesList] = useState([]);
	const [error, setError] = useState(null);
	const [breedSearch, setBreedSearch] = useState("");
	//fetch the breeds list from dog api
	const getBreedsList = () => {
		axios
			.get(breedsListApi)
			.then(({ data }) => {
				//create the object to keep the subBreeds available for now
				setAllBreeds(data.message);
				setBreesList(Object.keys(data.message))
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
			<h2>All the dogs</h2>
			<input
				placeholder="search fav breed..."
				type="text"
				value={breedSearch}
				onChange={(e) => setBreedSearch(e.target.value)}
			/>
			{breedsList
				.filter((breed) => breed.slice(0, breedSearch.length) === breedSearch)
				.map((breed, idx) => (
					<BreedItem key={idx} breed={breed} subBreed={allBreeds[breed]}/>
				))}
		</div>
	);
}

export default BreedList;
