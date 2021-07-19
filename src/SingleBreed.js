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
            <Link to="/">See all doggos</Link>
            {/* making sure images are loaded before running this next part --> simply becuase the css styling choice I made*/}
           {images.length > 0 &&
            <div className="row">
                <div className="column">
                    <img src={images[0]} alt={`${breed} dog`}/>
                    <img src={images[1]} alt={`${breed} dog`}/>
                </div>
                <div className="column">
                    <img src={images[2]} alt={`${breed} dog`}/>
                    <img src={images[3]} alt={`${breed} dog`}/>
                </div>
            </div>}
		</div>
	);
}
