import React from 'react';
import { connect } from 'react-redux';

class PostHandler extends React.Component {

  render() {
    return (
      <div className="main-content">
        Post Handler
      </div>
    );
  }

}

export default connect(state => state)(PostHandler);
