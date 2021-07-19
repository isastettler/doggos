import { BrowserRouter as Router, Route } from "react-router-dom";
import BreedList from './BreedList';
import SingleBreed from "./SingleBreed";

function App() {
  return (
    <Router>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/" component={BreedList} />
				<Route path="/:breed"component={SingleBreed}/>
    </Router>
  );
}

export default App;
