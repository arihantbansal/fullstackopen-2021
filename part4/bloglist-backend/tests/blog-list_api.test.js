const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

let token = null;
let noBlogsToken = null;

beforeEach(async () => {
	jest.setTimeout(10000);
	await Blog.deleteMany({});
	await User.deleteMany({});

	const janeDoe = await new User({
		username: "janedoe",
		password: "password",
	}).save();

	const userWithNoBlogs = await new User({
		username: "notroot",
		password: "secret",
	}).save();

	// Use JWT to get token
	const userForToken = { username: janeDoe.username, id: janeDoe._id };
	token = jwt.sign(userForToken, process.env.SECRET);

	const userWithNoBlogsToken = {
		username: userWithNoBlogs.username,
		id: userWithNoBlogs._id,
	};
	noBlogsToken = jwt.sign(userWithNoBlogsToken, process.env.SECRET);

	await Promise.all(
		helper.initialBlogs.map(blog => {
			blog.user = janeDoe.id;
			return new Blog(blog).save();
		})
	);
});

describe("when there are some blogs save initially", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("all blogs are returned", async () => {
		const response = await api.get("/api/blogs");

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test("a specific blog is within the returned blogs", async () => {
		const response = await api.get("/api/blogs");

		const titles = response.body.map(r => r.title);

		expect(titles).toContain("React patterns");
	});

	test("blogs should contain id property (not _id)", async () => {
		const response = await api.get("/api/blogs");

		expect(response.body[0].id).toBeDefined();
	});
});

describe("viewing a specific blog", () => {
	test("a specific note can be viewed when using valid id", async () => {
		const blogsAtStart = await helper.blogsInDb();

		const blogToView = blogsAtStart[0];

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(resultBlog.body).toEqual(
			expect.objectContaining({
				title: blogToView.title,
				author: blogToView.author,
				url: blogToView.url,
				likes: blogToView.likes,
				id: blogToView.id,
				user: blogToView.user.toString(),
			})
		);
	});

	test("fails with statuscode 404 if blog does not exist", async () => {
		const validNonexistingId = mongoose.Types.ObjectId();

		await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
	});

	test("fails with statuscode 400 id is invalid", async () => {
		const invalidId = "5e8cae887f883f27e06f54a66";

		await api.get(`/api/blogs/${invalidId}`).expect(400);
	});
});

describe("addition of new blog", () => {
	test("a valid blog can be added by authorized user", async () => {
		const newBlog = {
			title: "New blog",
			author: "Jane Doe",
			url: "http://dummyurl.com",
		};

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.set("Content-Type", "application/json")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const titles = blogsAtEnd.map(b => b.title);

		expect(titles).toHaveLength(helper.initialBlogs.length + 1);
		expect(titles).toContain("New blog");
	});

	test("if like property is misssing from req, it will default to value 0", async () => {
		const newBlog = {
			title: "Another blog",
			author: "Jane Doe",
			url: "http://dummyurl.com",
		};

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.set("Content-Type", "application/json")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
	});

	test("blog without title or url is not added", async () => {
		const newBlog = {
			likes: 12,
		};

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(newBlog)
			.expect(400);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});

	test("unauthorized user cannot create a blog", async () => {
		const newBlog = {
			title: "New blog",
			author: "Jane Doe",
			url: "http://dummyurl.com",
		};

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${null}`)
			.send(newBlog)
			.expect(401);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe("deletion of blog", () => {
	test("succeeds with status 204 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb();

		const blogToDelete = blogsAtStart[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set("Authorization", `Bearer ${token}`)
			.expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtStart).toHaveLength(helper.initialBlogs.length);
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const blogIds = blogsAtEnd.map(b => b.id);
		expect(blogIds).not.toContain(blogToDelete.id);
	});

	test("fails when user is not authorized", async () => {
		const blogsAtStart = await Blog.find({}).populate("user");

		const blogToDelete = blogsAtStart[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set("Authorization", `Bearer ${noBlogsToken}`)
			.expect(401);

		const blogsAtEnd = await Blog.find({}).populate("user");

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
		expect(blogsAtStart).toEqual(blogsAtEnd);
	});
});

describe("updating of likes of blog", () => {
	test("succeeds with status 400 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb();

		const blogToUpdate = blogsAtStart[0];

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send({ likes: 12 })
			.expect(200);

		const blogsAtEnd = await helper.blogsInDb();

		const updatedBlog = blogsAtEnd[0];

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

		expect(updatedBlog.likes).toBe(12);
	});

	test("fails with statuscode 404 if blog does not exist", async () => {
		const validNonexistingId = mongoose.Types.ObjectId();

		await api
			.put(`/api/blogs/${validNonexistingId}`)
			.send({ likes: 12 })
			.expect(404);
	});

	test("fails with statuscode 400 id is invalid", async () => {
		const invalidId = "5e8cae887f883f27e06f54a66";

		await api.put(`/api/blogs/${invalidId}`).send({ likes: 12 }).expect(400);
	});
});

afterAll(done => {
	mongoose.connection.close();
	done();
});
