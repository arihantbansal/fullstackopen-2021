import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
	let component;
	beforeEach(() => {
		component = render(
			<Blog
				blog={blog}
				user={user}
				removeBlog={mockHandlerRemove}
				updateBlog={mockHandlerUpdate}
			/>
		);
	});

	const blog = {
		title: "Component testing is done with react-testing-library",
		author: "Zuck",
		url: "https://blog-title.com",
		likes: 0,
		user: {
			username: "jane",
		},
	};

	const user = {
		name: "Jane Doe",
		username: "jane",
	};

	const mockHandlerUpdate = jest.fn();
	const mockHandlerRemove = jest.fn();

	test("shows the blog title and author, but not url and number of likes by default", () => {
		const title = component.container.querySelector(".blog-title");
		const author = component.container.querySelector(".blog-author");

		expect(title).toBeDefined();
		expect(author).toBeDefined();

		const details = component.container.querySelector(".blog-details");
		expect(details).toBe(null);
	});

	test("shows the blog details when the show button is clicked", () => {
		let button = component.getByText("view");
		fireEvent.click(button);

		button = component.getByText("hide");
		expect(button).toBeDefined();

		const details = component.container.querySelector(".blog-details");
		expect(details).toBeDefined();
		expect(details).toBeVisible();

		const likes = component.container.querySelector(".blog-likes");

		expect(component.container).toHaveTextContent("Like");
		expect(likes).toHaveTextContent(blog.likes);
		expect(component.container).toHaveTextContent(blog.url);
	});

	test("clicking the like button twice calls event handler passed as a prop twice", () => {
		let viewBtn = component.getByText("view");
		fireEvent.click(viewBtn);

		const button = component.getByText("Like");

		fireEvent.click(button);
		fireEvent.click(button);

		expect(mockHandlerUpdate.mock.calls).toHaveLength(2);
	});
});
