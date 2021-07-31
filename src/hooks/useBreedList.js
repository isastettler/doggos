import { useState, useEffect } from "react";
import axios from "axios";
//api to get list of all breeds from dog.ceo
const breedsListApi = "https://dog.ceo/api/breeds/list/all";

const useBreedList = () => {
	const [breedList, setBreedList] = useState([]);
	const [filteredBreedsList, setFilteredBreedsList] = useState([]);
	const [allBreeds, setAllBreeds] = useState({});
	const [error, setError] = useState(null);
	const [searchInput, setSearchInput] = useState("");

	async function getBreedsList() {
		axios
			.get(breedsListApi)
			.then(({ data }) => {
				// 	//set both, breedsList and filteredBreedsList to the all breeds fetched
				// 	//-> subbreeds would be available on the data.message object like such ->{ breed: [subbreed]}
				setAllBreeds(data.message);
				setBreedList(Object.keys(data.message));
				setFilteredBreedsList(Object.keys(data.message));
			})
			.catch((error) => setError(error));
	}

	useEffect(() => {
		getBreedsList();
	}, []);

	useEffect(() => {
		let regex = new RegExp(searchInput, "g");
		//if breedSearch is an empty string, set filteredBreedsList to breedsList
		regex === /(?:)/g
			? setFilteredBreedsList(breedList)
			: setFilteredBreedsList(breedList.filter((breed) => regex.test(breed)));
	}, [searchInput, breedList]);

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value);
	};

	return {
		allBreeds,
		filteredBreedsList,
		searchInput,
		handleSearchInput,
		error,
	};
};

export default useBreedList;
