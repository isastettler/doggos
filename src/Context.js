import React, { useState, useEffect } from "react";
import axios from "axios";

//api to get list of all breeds from dog.ceo
const breedsListApi = "https://dog.ceo/api/breeds/list/all";

export const PageContext = React.createContext({ allBreeds: [] });

export default function PageContextProvider (props) {
	const [allBreedsList, setAllBreedsList] = useState([]);
    const [ error, setError ] = useState(null)
    function getBreedsList() {
		axios
			.get(breedsListApi)
			.then(({ data }) => {
				// 	//-> subbreeds would be available on the data.message object like such ->{ breed: [subbreed]}
				setAllBreedsList(Object.keys(data.message));
			})
			.catch((error) => setError(error));
	}
    useEffect(() => {
     getBreedsList()
    }, [])
	return (
		<PageContext.Provider value={{ allBreeds: allBreedsList, error: error }}>
            {props.children}
		</PageContext.Provider>
	);
};
