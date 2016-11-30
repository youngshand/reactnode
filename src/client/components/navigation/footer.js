import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import pick from 'lodash/pick';

import { activateModal } from '../../actions';


/**
 * Renders on the footer of every page within the site
 */
class Footer extends React.Component {

  /**
   * Takes a modalTag and dispatches the activate event for it.
   */
  modalHandler(e, modalTag) {
    e.preventDefault();

    this.props.dispatch(activateModal(modalTag));
  }

  render() {

    // There is a vunerability with target blank, see more:
    // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
    return (
      <footer className="footer container">
        <a href="https://bitbucket.org/youngshand/react-frontend-2" target="_blank" rel="noopener noreferrer">View this project on bitbucket</a>
        <br />
        <a href="http://jenkins.yng.sh:8080/job/YSReactFrameworkStaging/" target="_blank" rel="noopener noreferrer">View this project's jenkins configuration</a>
        <br />
        <a href="" onClick={(e) => this.modalHandler(e, 'terms')}>Terms &amp; Conditions</a>

        <div className="copy">
          <a href="http://youngshand.com" target="_blank" rel="noopener noreferrer">&copy; Young &amp; Shand</a>
        </div>
      </footer>
    );
  }

}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

/**
 * Only pass the required props to the component
 */
function mapStateToProps(state) {
  return pick(state, ['dispatch']);
}

export default connect(mapStateToProps)(Footer);
