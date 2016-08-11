import React from 'react';
import { connect } from 'react-redux';
import Menu from './components/navigation/menu';
import Footer from './components/navigation/footer';
import Header from './components/navigation/header';


// This is the controller view
class App extends React.Component {

  render() {
    return (
      <div>
        <Header {...this.props} />
        <Menu />
        <div id="container">
          {React.cloneElement(this.props.children, { state: this.state })}
        </div>
        <Footer {...this.props} />
      </div>
    );
  }

}

App.propTypes = {
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.object.isRequired
}

// connect app to the redux store
export default connect(state => state.toJS())(App);
