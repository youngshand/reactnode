import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
        <a className="menu-close-button" onClick={(e) => this.closeHandler(e)} />

        <h2 className="menu-header">Menu</h2>

        <ul className="menu-items">
          <li className="menu-item"><Link to="/updating">Updating the framework</Link></li>
          <li className="menu-item"><Link to="/prototyping">Getting started with prototyping</Link></li>
          <li className="menu-item"><Link to="/caching">Getting started with cache</Link></li>
        </ul>
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
