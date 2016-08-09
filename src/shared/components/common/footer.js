import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {

  render() {
    return (
      <footer className="footer">
        Footer
      </footer>
    );
  }

}

export default connect(state => state.toJS())(Footer);
