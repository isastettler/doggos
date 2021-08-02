import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import axios from "axios";
import { MemoryRouter, Route } from "react-router-dom";

import App from "./App";
import BreedList from "./BreedList";
import SingleBreed from "./SingleBreed";
import PageContextProvider from "./Context";
const mockBreeds = {
	african: "",
	airedale: "",
	akita: "",
	cairn: "",
	collie: "",
	hound: "",
	kuvasz: "",
};
const images = { african: ["image1", "image2", "image2", "image2"] };

const renderComponent = ({ breed = "" }) =>
	render(
		<PageContextProvider>
			<MemoryRouter initialEntries={[`/${breed}`]}>
				<Route path="/:breed">
					<SingleBreed />
				</Route>
				<Route exact path="/">
					<BreedList />
				</Route>
			</MemoryRouter>
		</PageContextProvider>
	);
jest.mock("axios");

describe("App Router", () => {
	beforeEach(() => {
		return axios.get.mockImplementationOnce(() =>
			Promise.resolve({ data: { message: mockBreeds } })
		);
	});
	test("navigates from BreedList to SingleBreed and back to BreedList without a api call to dog.ceo", async () => {
		renderComponent(<App />);
		const breed = "african";
		expect(screen.getByText(/All the dogs/i)).toBeInTheDocument();
		expect(screen.queryByText(`${breed}`)).toBeNull();
		expect(await screen.findByText(`${breed}`)).toBeInTheDocument();
		expect(await screen.findAllByRole("link")).toHaveLength(7);
		act(() => {
			userEvent.click(screen.getByText(`${breed}`));
			axios.get.mockImplementationOnce(() =>
				Promise.resolve({ data: { message: images[breed] } })
			);
		});

		expect(
			await screen.findByText(/Look at these sweet african dogs/i)
		).toBeInTheDocument();
		act(() => {
			userEvent.click(screen.getByText(/See all doggos/i));
		});
		expect(await screen.findByText(/All the dogs/i)).toBeInTheDocument();
	});
});
