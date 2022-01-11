const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const {
	ApolloServerPluginLandingPageGraphQLPlayground,
	AuthenticationError,
} = require("apollo-server-core");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const book = require("./models/book");
require("dotenv").config();

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch(error => {
		console.log("error connection to MongoDB:", error.message);
	});

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		genres: [String!]!
		author: Author!
		id: ID!
	}

	type Author {
		name: String!
		bookCount: Int!
		born: Int
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`;

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: (root, args) => {
			let author;
			if (args.author) {
				author = await Author.findOne({ name: args.author });
				if (!author) {
					return null;
				}
			}

			let filter = {};
			if (args.author) {
				filter = { author: author.id };
			}
			if (args.genre) {
				filter = { genres: { $in: args.genre } };
			}
			if (args.genre && args.author) {
				filter = {
					author: author.id,
					genres: { $in: args.genre },
				};
			}

			return await Book.find(filter).populate("author");
		},
		allAuthors: () => Author.find({}),
		me: (root, args, context) => context.currentUser,
	},
	Author: {
		bookCount: root => {
			const booksByAuthor = await Book.find({ author: root.name });
			return booksByAuthor.length;
		},
	},
	Mutation: {
		addBook: (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			try {
				let author = await Author.findOne({ name: args.author });

				if (author) {
					let book = new Book({ ...args, author: author._id });
					await book.save();
				}

				if (!author) {
					author = new Author({
						name: args.author,
						born: null,
						bookCount: 1,
						id: uuid(),
					});

					let book = new Book({ ...args, author: author._id });
					await author.save();
					await book.save();
				}
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}

			return book;
		},
		editAuthor: (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			const author = await Author.findOne({ name: args.name });

			if (!author) {
				return null;
			}

			author.born = args.setBornTo;

			try {
				await author.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}

			return author;
		},
		createUser: (root, args) => {
			const user = new User({ ...args });

			return user.save().catch(error => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},
		login: (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new UserInputError("wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith("bearer ")) {
			const decodedToken = jwt.verify(
				auth.substring(7),
				process.env.JWT_SECRET
			);

			const currentUser = await User.findById(decodedToken.id).populate(
				"friends"
			);
			return { currentUser };
		}
	},
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
