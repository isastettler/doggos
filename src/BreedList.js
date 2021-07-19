import React, { useState, useEffect } from "react";
import BreedItem from "./BreedItem";
import './index.css'

const breedsListApi = "https://dog.ceo/api/breeds/list/all";

function BreedList() {
	const [allBreeds, setAllBreeds] = useState([]);
	const [breedSearch, setBreedSearch] = useState('');
	//fetch the breeds list from dog api
	const getBreedsList = async () => {
		const response = await fetch(breedsListApi);
		const { message } = await response.json();
		console.log(message)
		const breedsList = Object.keys(message);
		setAllBreeds(breedsList);
	};
	useEffect(() => {
		getBreedsList();
	}, []);

	return (
		<div className="container">
			<h2>Dog List goes here </h2>
			<input placeholder="search fav breed..." onChange={(e) => setBreedSearch(e.target.value)}/>
			{allBreeds.filter(breed => breed.slice(0, breedSearch.length) === breedSearch).map((breed, idx) => (
				<BreedItem key={idx} breed={breed} />
			))}
		</div>
	);
}

export default BreedList;
