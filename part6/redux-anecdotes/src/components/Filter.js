import { filter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = props => {
	const handleChange = event => {
		const filterValue = event.target.value;
		props.filter({ filter: filterValue });
	};

	return (
		<div className="filter">
			<label htmlFor="filter">Filter</label>{" "}
			<input id="filter" className="filter-input" onChange={handleChange} />
		</div>
	);
};

export default connect(null, { filter })(Filter);
