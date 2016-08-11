import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import pick from 'lodash/pick';


class Menu extends React.Component {

  render() {
    return this.props.menu.isOpen ? (
      <div className="menu">
        <h2>Menu</h2>
      </div>
    ) : false;
  }

}

Menu.propTypes = {
  menu: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired
  }).isRequired
};

/**
 * Returns only the props required for this component to render
 */
function mapStateToProps(state) {
  return pick(state.toJS(), ['menu']);
}

export default connect(mapStateToProps)(Menu);
