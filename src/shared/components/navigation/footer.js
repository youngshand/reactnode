import React from 'react';

/**
 * Renders on the footer of every page within the site
 */
class Footer extends React.Component {

  render() {

    // There is a vunerability with target blank, see more:
    // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
    return (
      <footer className="footer container">
        <a href="https://bitbucket.org/youngshand/react-frontend-2" target="_blank" rel="noopener noreferrer">View this project on bitbucket</a><br />
        <a href="http://jenkins.yng.sh:8080/view/Sovereign/job/YSReactFrameworkStaging" target="_blank" rel="noopener noreferrer">View this project's jenkins configuration</a>

        <div className="copy">
          <a href="http://youngshand.com" target="_blank" rel="noopener noreferrer">&copy; Young &amp; Shand</a>
        </div>
      </footer>
    );
  }

}

export default Footer;
