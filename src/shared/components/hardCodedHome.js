import React from 'react';
import { connect } from 'react-redux';

import StartCaching from './start/caching';
import StartPrototying from './start/prototyping';


class HardCodedHome extends React.Component {

  render() {
    return (
      <div className="main-content">

        <h1>Welcome to the YS React Framework</h1>

        <StartCaching />
        <StartPrototying />
      </div>
    );
  }

}

export default connect(state => state.toJS())(HardCodedHome);
