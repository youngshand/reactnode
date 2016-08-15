import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import pick from 'lodash/pick';
import map from 'lodash/map';

import { closeMenu } from '../../actions';
import { snippets } from '../infoHandler';

class Menu extends React.Component {

  closeHandler(e) {
    e.preventDefault();
    this.props.dispatch(closeMenu());
  }

  render() {
    const snippetLinks = map(snippets, (s, k) => (
      <li key={k} className="menu-item"><Link to={k}>{s.linkText}</Link></li>
    ));

    return this.props.menu.isOpen ? (
      <div className="menu">
        <a className="menu-close-button" onClick={(e) => this.closeHandler(e)} />

        <h2 className="menu-header">Menu</h2>

        <ul className="menu-items">
          {snippetLinks}
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
