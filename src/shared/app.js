import React from 'react';
import { connect } from 'react-redux';
// import { withRouter, routerShape } from 'react-router';
import pick from 'lodash/pick';

import Menu from './components/navigation/menu';
import Footer from './components/navigation/footer';
import Header from './components/navigation/header';


// This is the controller view
class App extends React.Component {

  // componentDidMount() {
  //   this.props.router.listenBefore((evt) => {
  //     console.log('EVT', evt);
  //   });
  // }

  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div id="container">
          {React.cloneElement(this.props.children)}
        </div>
        <Footer />
      </div>
    );
  }

}

App.propTypes = {
  // router: routerShape,
  children: React.PropTypes.object.isRequired
}

/**
 * Passing all state props to the component can cause excessive re-renders.
 * Map state to props uses lodash's pick function to select only the parts
 * of state and pass them to the component.
 * http://lodash.com/docs#pick
 */
function mapStateToProps(state) {
  return pick(state.toJS(), ['router', 'dispatch', 'children']);
}

// make the react router avaliable to the app
// connect app to the redux store
export default connect(mapStateToProps)(App);
