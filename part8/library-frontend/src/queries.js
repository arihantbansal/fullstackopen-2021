import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			bookCount
			born
		}
	}
`;

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			published
		}
	}
`;

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author
			published
		}
	}
`;

export const UPDATE_AUTHOR = gql`
	mutation updateAuthor($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			bookCount
			born
		}
	}
`;
