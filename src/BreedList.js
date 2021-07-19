import React, { useState, useEffect } from "react";
import BreedItem from "./BreedItem";

const breedsListApi = "https://dog.ceo/api/breeds/list/all";

function BreedList() {
	const [allBreeds, setAllBreeds] = useState([]);
	//fetch the breeds list from dog api
	const getBreedsList = async () => {
		const response = await fetch(breedsListApi);
		const { message } = await response.json();
		const breedsList = Object.keys(message);
		setAllBreeds(breedsList);
	};
	useEffect(() => {
		getBreedsList();
	}, []);

	return (
		<div className="container">
			<h2>Dog List goes here </h2>
			{allBreeds.map((breed, idx) => (
				<BreedItem key={idx} breed={breed} />
			))}
		</div>
	);
}

export default BreedList;
