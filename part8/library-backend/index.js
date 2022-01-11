const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
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

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: (root, args) => {
			// const byGenre = book => book.genres.includes(args.genre);
			// const byAuthor = book => (args.author === book.author ? book : null);

			if (!args.genre) {
				return Book.find({});
			}

			return Book.find({ genres: { $in: [genre] } });
		},
		allAuthors: () => Author.find({}),
	},
	Author: {
		bookCount: root => {
			const booksByAuthor = await Book.find({ author: root.name });
			return booksByAuthor.length;
		},
	},
	Mutation: {
		addBook: (root, args) => {
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
		editAuthor: (root, args) => {
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
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
