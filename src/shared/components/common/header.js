import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {

  render() {
    return (
      <header className="header">
        Header
      </header>
    );
  }

}

export default connect(state => state.toJS())(Header);
