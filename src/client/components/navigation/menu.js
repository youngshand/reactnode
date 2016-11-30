import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/pick';

import { closeMenu } from '../../actions';

class Menu extends React.Component {

	closeHandler(e) {
		e.preventDefault();
		this.props.dispatch(closeMenu());
	}

	render() {

		return this.props.menu.isOpen ? (
			<div className="menu">
				<a className="close-button menu-close-button" onClick={(e) => this.closeHandler(e)} />

				<h2 className="menu-header">Menu</h2>

			</div>
		) : false;
	}

}

Menu.propTypes = {
	dispatch: PropTypes.func.isRequired,
	menu: PropTypes.shape({
		isOpen: PropTypes.bool.isRequired
	}).isRequired
};

/**
 * Returns only the props required for this component to render
 */
function mapStateToProps(state) {
	return pick(state, ['dispatch', 'menu']);
}

export default connect(mapStateToProps)(Menu);
