describe("Blog app", function () {
	beforeEach(function () {
		// Empty test db and add a new user
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Jane Doe",
			username: "janedoe",
			password: "secret",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		const anotherUser = {
			name: "John Doe",
			username: "johndoe",
			password: "anothersecret",
		};
		cy.request("POST", "http://localhost:3003/api/users/", anotherUser);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.contains("Blogs");
		cy.get("input[name='Username']");
		cy.get("input[name='Password']");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("input[name='Username']").type("janedoe");
			cy.get("input[name='Password']").type("secret");
			cy.get("button[type='submit']").click();

			cy.contains("Jane Doe logged in");
		});

		it("fails with wrong credentials", function () {
			cy.get("input[name='Username']").type("wrong");
			cy.get("input[name='Password']").type("credentials");
			cy.get("button[type='submit']").click();

			cy.contains("Wrong credentials").should(
				"have.css",
				"color",
				"rgb(255, 0, 0)"
			);
		});

		describe("When logged in", function () {
			beforeEach(function () {
				cy.login({ username: "janedoe", password: "secret" });
			});

			it("A blog can be created", function () {
				cy.contains("Create New Blog").click();
				cy.get("input[name='title']").type("A new blog created by Cypress");
				cy.get("input[name='author']").type("Cypress");
				cy.get("input[name='url']").type("https://docs.cypress.io/");
				cy.get("button[type='submit']").click();

				cy.contains("A new blog created by Cypress");
			});

			describe("and a blog exists", function () {
				beforeEach(function () {
					cy.createBlog({
						title: "Cypress creating a new blog",
						author: "Cypress",
						url: "https://www.cypress.io/",
					});
				});

				it("A user can like a blog", function () {
					cy.contains("View").click();
					cy.get(".blog-likes").should("contain", 0);
					cy.get(".blog-like-btn").click();
					cy.get(".blog-likes").should("contain", 1);
				});

				it("A user who can created the blog can delete it", function () {
					cy.contains("View").click();
					cy.contains("Cypress creating a new blog");
					cy.contains("Remove").click();
					cy.contains("Cypress creating a new blog").should("not.exist");
				});
			});

			describe("and multiple blogs exist", function () {
				beforeEach(function () {
					cy.createBlog({
						title: "First blog",
						author: "Cypress",
						url: "https://www.cypress.io/",
						likes: 0,
					});
					cy.createBlog({
						title: "Second blog",
						author: "Cypress",
						url: "https://www.cypress.io/",
						likes: 4,
					});
					cy.createBlog({
						title: "Third blog",
						author: "Cypress",
						url: "https://www.cypress.io/",
						likes: 2,
					});
				});

				it("Blogs are ordered based on number of likes, in descending order", function () {
					cy.get(".blog>p>span.blog-title").should(items => {
						expect(items[0]).to.contain("Second blog");
						expect(items[1]).to.contain("Third blog");
						expect(items[2]).to.contain("First blog");
					});
				});
			});

			describe("When another user logs in", function () {
				beforeEach(function () {
					cy.login({ username: "janedoe", password: "secret" });
					cy.createBlog({
						title: "Blog created by janedoe",
						author: "janedoe",
						url: "http://jane.doe",
					});
				});
				it("user can't delete blog created by another user", function () {
					cy.contains("Blog created by jane");
					cy.contains("View").click();
					cy.contains("Remove");
					cy.contains("Logout").click();
					cy.login({ username: "johndoe", password: "anothersecret" });
					cy.contains("Blog created by jane");
					cy.contains("View").click();
					cy.contains("User: Jane Doe");
					cy.contains("Remove").should("not.exist");
				});
			});
		});
	});
});
