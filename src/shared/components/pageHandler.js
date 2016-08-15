import React from 'react';
import { connect } from 'react-redux';

class PageHandler extends React.Component {

  render() {
    return (
      <div className="main-content">
        Page Handler
      </div>
    );
  }

}

export default connect(state => state)(PageHandler);
