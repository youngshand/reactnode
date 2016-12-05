// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import pick from 'lodash/pick';

import { toggleMenu } from '../../actions';

class Header extends React.Component {

  menuClickHandler(e) {
    e.preventDefault();
    this.props.dispatch(toggleMenu());
  }

  render() {
    return (
      <header>
        <div className="header-container">
          <Link className="header-control header-brand" to="/">
            <span className="header-logo">YS</span>
          </Link>
          <a className="header-control header-menu" onClick={(e) => this.menuClickHandler(e)}>Menu</a>
          <div className="header-banner">
            <h1>YS React Framework</h1>
          </div>
        </div>
      </header>
    );
  }

}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
};

/**
 * Returns only the props required for this component to render
 */
function mapStateToProps(state) {
  return pick(state, ['dispatch']);
}

export default connect(mapStateToProps)(Header);
