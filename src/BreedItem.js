import React from "react";
import { Link } from "react-router-dom";

export default function BreedItem({ breed, subBreed }) {
    // console.log(subBreed)
	return <Link to={{ pathname: `/${breed}`, state: breed }}>{breed}</Link>
}
