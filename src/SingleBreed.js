import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";

export default function SingleBreed({ history, match }) {
    const { breed } = useParams();
	const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
	//update api to fetch 4 random pic of selected breed
	const breedImageApi = `https://dog.ceo/api/breed/${breed}/images/random/4`;
    //fetch data using axios
	const getBreedImages = () => {
		axios.get(breedImageApi).then(({ data }) => {
            setImages(data.message);
        }).catch(error => setError(error));
	};
	useEffect(() => {
        getBreedImages();
	},[]);
	return (
        error ? <div>Error: ${error.message}</div> :
		<div className="container">
			<h2>Look at these sweet {breed} dogs</h2>
            <Link className="backLink" to="/">See all doggos</Link>
			{images.map((image, idx) => (
				<img key={idx} src={image} alt={`${breed} dog`} />
			))}
		</div>
	);
}
