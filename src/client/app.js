// @flow
/**
 * Node module imports
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter, routerShape } from 'react-router';
import pick from 'lodash/pick';

/**
 * File imports
 */

import { closeMenu, navigateTo } from './actions';
import Menu from './components/navigation/navigation';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import TermsModal from './components/modal/modal';


/**
 * The main component of the website.
 * Page handlers are rendered within this component.
 */
class App extends React.Component {

  componentDidMount() {
    // By default the location object is not accessible in the state.
    // This attaches a listener to the router and detects updates on the location
    // and passes the new location to the state.
    this.props.router.listenBefore((location) => {
      // make sure the menu always closes on navigation
      this.props.dispatch(closeMenu());

      this.props.dispatch(navigateTo(location));
    });
  }

  render() {
    return (
      <div>
        <TermsModal />
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
  router: routerShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
}

/**
 * Passing all state props to the component can cause excessive re-renders.
 * Map state to props uses lodash's pick function to select only the parts
 * of state and pass them to the component.
 * http://lodash.com/docs#pick
 */
function mapStateToProps(state) {
  return pick(state, ['router', 'dispatch', 'children']);
}

// Make the react router avaliable to the app.
// Connect app to the redux store.
export default withRouter(connect(mapStateToProps)(App));
