import blogService from "services/blogs";

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case "INIT_BLOGS":
			return action.data;
		case "ADD_BLOG":
			return [...state, action.data];
		case "DELETE_BLOG":
			return state.filter(blog => blog.id !== action.data.id);
		case "LIKE_BLOG":
			return state.map(blog =>
				blog.id === action.data.id
					? { ...blog, likes: action.data.likes }
					: blog
			);
		default:
			return state;
	}
};

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll();
		dispatch({
			type: "INIT_BLOGS",
			data: blogs,
		});
	};
};

export const addBlog = blogObject => {
	return async dispatch => {
		const returnedBlog = await blogService.create(blogObject);
		dispatch({
			type: "ADD_BLOG",
			data: returnedBlog,
		});
	};
};

export const deleteBlog = (blogId, blogObj) => {
	return async dispatch => {
		if (window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`)) {
			await blogService.deleteBlog(blogId);
		}
		dispatch({
			type: "DELETE_BLOG",
			data: { id: blogId },
		});
	};
};

export const likeBlog = (blogId, blogObject) => {
	return async dispatch => {
		const updatedBlog = {
			...blogObject,
			id: blogId,
			likes: blogObject.likes + 1,
		};
		await blogService.update(blogId, updatedBlog);
		dispatch({
			type: "LIKE_BLOG",
			data: updatedBlog,
		});
	};
};

export default blogReducer;
