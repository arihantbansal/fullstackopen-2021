const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	const reducer = (total, post) => {
		return total + post.likes;
	};

	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
	if (!blogs || blogs.length === 0) return null;

	// Find maximum number of likes
	const maxLikes = Math.max.apply(
		Math,
		blogs.map(blog => blog.likes)
	);

	// Get blog with most likes
	const max = blogs.find(blog => blog.likes === maxLikes);

	// Return data of blog with most likes
	return {
		title: max.title,
		author: max.author,
		likes: max.likes,
	};
};

const mostBlogs = blogs => {
	// Get all blog authors
	const authors = blogs.map(blog => blog.author);

	if (!authors || authors.length === 0) {
		return null;
	}

	// Count blogs by author
	const countBlogsByAuthor = authors.reduce((acc, curr) => {
		acc[curr] ? acc[curr]++ : (acc[curr] = 1);

		return acc;
	}, {});

	// Return array with name of author with most blogs and amount of blogs.
	const authorWithMostBlogsArray = Object.entries(
		countBlogsByAuthor
	).reduce((a, b) =>
		countBlogsByAuthor[a[0]] > countBlogsByAuthor[b[0]] ? a : b
	);

	const authorWithMostBlogs = {
		author: authorWithMostBlogsArray[0],
		blogs: authorWithMostBlogsArray[1],
	};

	// Return data of author with most blogs
	return authorWithMostBlogs;
};

const mostLikes = blogs => {
	if (blogs.length === 0) {
		return null;
	}

	// Get all of the blog authors
	const authors = blogs.map(blog => blog.author);

	// filter out doubles using Set data structure
	let uniqueAuthors = [...new Set(authors)];

	const likesByAuthor = uniqueAuthors.map(author => {
		// Get the blogs for each author
		const blogsByAuthor = blogs.filter(blog => blog.author === author);

		// Count the total amount of likes by author
		const countLikesPerAuthor = blogsByAuthor.reduce(
			(accumulator, currentValue) => accumulator + currentValue.likes,
			0
		);

		// Create an object to return author + total amount of it's likes.
		const amountOfLikesByAuthor = {
			author: author,
			likes: countLikesPerAuthor,
		};

		return amountOfLikesByAuthor;
	});

	// Return data of author with the most likes
	return likesByAuthor.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
