import React from 'react';

/**
 * Renders on the footer of every page within the site
 */
class Footer extends React.Component {

  render() {

    // There is a vunerability with target blank see:
    // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
    return (
      <footer className="footer">
        <a href="https://bitbucket.org/youngshand/react-frontend-2" target="_blank" rel="noopener noreferrer">View this project on bitbucket</a>

        <div className="copy">
          <a href="https://youngshand.com" target="_blank" rel="noopener noreferrer">&copy; Young&amp;Shand</a>
        </div>
      </footer>
    );
  }

}

export default Footer;
