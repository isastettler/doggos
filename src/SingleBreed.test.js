import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter, Route } from "react-router-dom";

import axios from "axios";

import SingleBreed from "./SingleBreed";

jest.mock("axios");

const images = ["image1", "image2", "image2", "image2"];
const renderComponent = ({ breed }) =>
	render(
		<MemoryRouter initialEntries={[`/${breed}`]}>
			<Route path="/:breed">
				<SingleBreed />
			</Route>
		</MemoryRouter>
	);

describe("SingleBreed Component", () => {
	beforeEach(() => {
		return axios.get.mockImplementationOnce(() =>
			Promise.resolve({ data: { message: images } })
		);
	});
	test("fetches and renders 4 images with alt text set to breed name", async () => {
		const history = createMemoryHistory();
		const route = "/african";
		const breed = { breed: "african" };
		history.push(route);
		renderComponent(breed);
		expect(await screen.findAllByRole("img")).toHaveLength(4);
		const images = document.querySelectorAll("img");
		expect(images[0].getAttribute("alt")).toBe("african dog");
	});
	test("renders link to redirect back to BreedList View", async () => {
		const history = createMemoryHistory();
		const route = "/african";
		const breed = { breed: "african" };
		history.push(route);
		renderComponent(breed);
		expect(await screen.findByRole("link")).toHaveTextContent("See all doggos");
		expect(document.querySelector("a").getAttribute("href")).toBe("/");
	});
});
