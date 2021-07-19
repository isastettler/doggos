import React, { useState } from 'react';
import SingleBreed from './SingleBreed';

export default function BreedItem ({breed}) {
    const [breedView, setBreedView] = useState(false);
    return ( !breedView ? <div onClick={() => setBreedView(!breedView)}>{breed}</div> : <SingleBreed setBreedView={setBreedView} breed={breed}/>)
}

