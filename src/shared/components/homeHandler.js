import React from 'react';
import { connect } from 'react-redux';

class HomeHandler extends React.Component {

  render() {
    return (
      <div className="main-content">
        Home Handler
      </div>
    );
  }

}

export default connect(state => state)(HomeHandler);
