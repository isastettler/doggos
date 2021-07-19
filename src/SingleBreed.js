import { useState, useEffect } from 'react';

export default function SingleBreed ({ breed, setBreedView }) {
    const [images, setImages] = useState([])
    //api to fetch 4 random pic of selected breed
    const breedImageApi = `https://dog.ceo/api/breed/${breed}/images/random/4`
    const getBreedImages = async () => {
        const response = await fetch(breedImageApi);
		const { message }= await response.json();
        setImages(message)
    }
    useEffect(() => {
        getBreedImages();
    }, [])
    return <div onClick={()=>setBreedView(false)}>Single breed view of {breed}
    {images.map((image, idx) => <img key={idx} src={image} alt={`${breed} dog`}/>)}
    </div>
}