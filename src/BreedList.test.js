import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouter, Route } from "react-router-dom";
import PageContextProvider from "./Context";

import BreedList from "./BreedList";

const mockBreeds = {
	african: "",
	airedale: "",
	akita: "",
	cairn: "",
	collie: "",
	hound: "",
	kuvasz: "",
};
const renderWithContext = ({ route = "/" } = {}) => {
	window.history.pushState({}, "Test page", route);
	return render(
		<PageContextProvider>
			<MemoryRouter initialEntries={[`/`]}>
				<Route exact path="/">
					<BreedList />
				</Route>
			</MemoryRouter>
		</PageContextProvider>
	);
};
jest.mock("axios");
describe("BreedList Component", () => {
	beforeEach(() => {
		return axios.get.mockImplementationOnce(() =>
			Promise.resolve({ data: { message: mockBreeds } })
		);
	});
	test("receives breedList from ContextProvider and renders a link for each breed", async () => {
		renderWithContext(<BreedList />);
		expect(screen.queryByRole("link")).toBeNull();
		expect(await screen.findAllByRole("link")).toHaveLength(7);
	});
	test("filters breed list with input substring", async () => {
		renderWithContext(<BreedList />);
		const inputField = screen.getByRole("textbox");
		act(() => {
			userEvent.type(inputField, "a");
		});
		expect(inputField).toHaveValue("a");
		expect(await screen.findAllByRole("link")).toHaveLength(4);
		act(() => {
			userEvent.type(inputField, "f");
		});
		expect(inputField).toHaveValue("af");
		expect(await screen.findAllByRole("link")).toHaveLength(1);
	});
});
