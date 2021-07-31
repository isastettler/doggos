import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const useSingleBreed = () => {
	const [images, setImages] = useState([]);
	const [error, setError] = useState(null);
	const { breed } = useParams();
    //api to fetch 4 random pics of specific breed
	const breedImageApi = `https://dog.ceo/api/breed/${breed}/images/random/4`;
	const getBreedImages = () => {
		axios
			.get(breedImageApi)
			.then(({ data }) => {
				setImages(data.message);
			})
			.catch((error) => setError(error));
	};

	useEffect(() => {
		getBreedImages();
	}, []);

	return { breed, images, error };
};

export default useSingleBreed;
