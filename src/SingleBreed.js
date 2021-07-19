import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function SingleBreed({ history, match }) {
	const [images, setImages] = useState([]);
    const { breed } = useParams();
	//api to fetch 4 random pic of selected breed
	const breedImageApi = `https://dog.ceo/api/breed/${breed}/images/random/4`;
	const getBreedImages = async () => {
		const response = await fetch(breedImageApi);
		const { message } = await response.json();
		setImages(message);
	};
	useEffect(() => {
		getBreedImages();
	},[]);

	return (
		<div className="container">
			<h2>Look at these sweet {breed} dogs</h2>
            <Link className="backLink" to="/">See all doggos</Link>
			{images.map((image, idx) => (
				<img key={idx} src={image} alt={`${breed} dog`} />
			))}
		</div>
	);
}
