import React, { useState, useEffect } from "react";
import axios from "axios";
import BreedName from "./BreedName";
import "./index.css";

//api to fetch list of all breeds
const breedsListApi = "https://dog.ceo/api/breeds/list/all";

function BreedList() {
	const [breedsList, setBreedsList] = useState([]);
	const [filteredBreedsList, setFilteredBreedsList] = useState([]);
	const [allBreeds, setAllBreeds] = useState({});
	const [error, setError] = useState(null);
	const [breedSearch, setBreedSearch] = useState("");
	//fetch the breeds list from dog api
	const getBreedsList = () => {
		axios
			.get(breedsListApi)
			.then(({ data }) => {
				//set both, breedsList and filteredBreedsList to the all breeds fetched 
					//-> subbreeds would be available on the data.message object like such ->{ breed: [subbreed]} 
				setBreedsList(Object.keys(data.message));
				setFilteredBreedsList(Object.keys(data.message))
			})
			.catch((error) => setError(error));
	};
	useEffect(() => {
		getBreedsList();
	}, []);
	useEffect(() => {
		let regex = new RegExp(breedSearch, "g");
		//if breedSearch is an empty string, set filteredBreedsList to breedsList
		regex === /(?:)/g ? setFilteredBreedsList(breedsList) :
		setFilteredBreedsList(breedsList.filter((breed) => regex.test(breed)));
	}, [breedSearch]);
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
			{filteredBreedsList
				.map((breed, idx) => (
					<BreedName key={idx} breed={breed} subBreed={allBreeds[breed]} />
				))}
		</div>
	);
}

export default BreedList;
