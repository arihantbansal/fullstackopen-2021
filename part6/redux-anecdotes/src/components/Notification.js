import { connect } from "react-redux";

const Notification = props => {
	return props.notification ? (
		<div className="notification">{props.notification}</div>
	) : null;
};

const mapStateToProps = state => {
	return {
		notification: state.notification,
	};
};

export default connect(mapStateToProps)(Notification);
