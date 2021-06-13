import React from "react";
import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = () => {
	const dispatch = useDispatch();

	const handleChange = event => {
		const filterValue = event.target.value;
		dispatch(filter({ filter: filterValue }));
	};

	return (
		<div className="filter">
			<label htmlFor="filter">Filter</label>{" "}
			<input id="filter" className="filter-input" onChange={handleChange} />
		</div>
	);
};

export default Filter;
