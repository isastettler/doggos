import { useState, useEffect, useContext } from "react";
import { PageContext } from "../Context";

const useBreedList = () => {
	// const [breedList, setBreedList] = useState([]);
	const [filteredBreedsList, setFilteredBreedsList] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const breedList = useContext(PageContext).allBreeds;
	const error = useContext(PageContext).error;
	

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
		filteredBreedsList,
		searchInput,
		handleSearchInput,
		error
	};
};

export default useBreedList;
