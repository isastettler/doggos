import { BrowserRouter as Router, Route } from "react-router-dom";
import BreedList from "./BreedList";
import SingleBreed from "./SingleBreed";
import PageContextProvider from "./Context";

function App() {
	return (
		<PageContextProvider>
			<Router>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/" component={BreedList} />
				<Route path="/:breed" component={SingleBreed} />
			</Router>
		</PageContextProvider>
	);
}

export default App;
