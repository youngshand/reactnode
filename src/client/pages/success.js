import React from 'react';
import { connect } from 'react-redux';

import pick from 'lodash/pick';


class Success extends React.Component {

  render() {
    return (
      <div className="main-content">
        Home Handler
      </div>
    );
  }

}

/**
 * Add prop types here
 */
Success.propTypes = {}

/**
 * Returns only the props required for this component to render
 */
function mapStateToProps(state) {
  // Add prop names to the pick array which need to be used in the Success
  return pick(state, []);
}

export default connect(mapStateToProps)(Success);
