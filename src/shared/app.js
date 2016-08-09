import React from 'react';
import { connect } from 'react-redux';
import Footer from './components/common/footer';
import Header from './components/common/header';

// This is the controller view
class App extends React.Component {

  static propTypes = {
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    if(typeof window !== 'undefined'){
      window.onerror = this.errorHandling;
    }
  }

  errorHandling(message, file, line, column, errorObject) {
    column = column || (window.event && window.event.errorCharacter);
    let stack = errorObject ? errorObject.stack : null;

    if(!stack) {
        let stack = [];
        let f = arguments.callee.caller;
        while (f)
        {
            stack.push(f.name);
            f = f.caller;
        }
        errorObject['stack'] = stack;
    }

    let data = {
        message:message,
        file:file,
        line:line,
        column:column,
        errorStack:stack
    };

    console.error('----------------------');
    console.error('ERROR CAUGHT IN APP.JS');
    console.error('----------------------');
    console.error(`MSG: ${data.message}`);
    console.error(`IN: ${data.file}#${data.line}:${data.column}`);
    console.error(data.errorStack)
    console.error('--------------------');
    console.error('Original Error Below');
    console.error('--------------------');

    return false;

  }

  render() {
    return (
      <div>
        <Header {...this.props} />
        <div id="container">
          {React.cloneElement(this.props.children, { state: this.state })}
        </div>
        <Footer {...this.props} />
      </div>
    );
  }

}

// connect app to the redux store
export default connect(state => state.toJS())(App);
