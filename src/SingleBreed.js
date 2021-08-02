import { Link } from "react-router-dom";
import useSingleBreed from "./hooks/useSingleBreed";

export default function SingleBreed() {
	//call custom hook for variables used in display view
	const { breed, images, error } = useSingleBreed();

	return error ? (
		<div>Error: ${error.message}</div>
	) : (
		<div className="container">
			<h2>Look at these sweet {breed} dogs</h2>
			<Link to="/" >See all doggos</Link>
			{/* making sure images are loaded before running this next part --> simply becuase the css styling choice I made*/}
			{images.length > 0 && (
				<div className="row">
					<div className="column">
						<img src={images[0]} alt={`${breed} dog`} />
						<img src={images[1]} alt={`${breed} dog`} />
					</div>
					<div className="column">
						<img src={images[2]} alt={`${breed} dog`} />
						<img src={images[3]} alt={`${breed} dog`} />
					</div>
				</div>
			)}
		</div>
	);
}
