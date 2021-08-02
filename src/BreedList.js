import React, { useContext } from "react";

import BreedName from "./BreedName";
import useBreedList from "./hooks/useBreedList";
import "./index.css";

function BreedList() {
	
	//call custom hook for variables needed in display view
	const { filteredBreedsList, searchInput, handleSearchInput, error} =
		useBreedList();
	return error ? (
		<div>Error: ${error.message}</div>
	) : (
		<div className="container">
			<h2>All the dogs</h2>
			<input
				placeholder="search fav breed..."
				type="text"
				value={searchInput}
				onChange={handleSearchInput}
			/>
			{filteredBreedsList.map((breed, idx) => (
				<BreedName key={idx} breed={breed} />
			))}
		</div>
	);
}

export default BreedList;
