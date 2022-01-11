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
			if (books.find(b => b.title === args.title)) {
				throw new UserInputError("Name must be unique", {
					invalidArgs: args.title,
				});
			}

			const book = { ...args, id: uuid() };
			if (!authors.find(p => p.name === args.author)) {
				const author = { name: args.author, born: null };
				authors = authors.concat(author);
			}
			books = books.concat(book);
			return book;
		},
		editAuthor: (root, args) => {
			const author = authors.find(author => author.name === args.name);

			if (!author) {
				return null;
			}

			const updatedAuthor = { ...author, born: args.setBornTo };
			authors = authors.map(a => (a.name === args.name ? updatedAuthor : a));
			return updatedAuthor;
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
