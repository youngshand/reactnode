import React from 'react';
import { connect } from 'react-redux';

class NotFoundHandler extends React.Component {

  render() {
    return (
      <div className="main-content">
        Not Found Handler
      </div>
    );
  }

}

export default connect(state => state)(NotFoundHandler);
