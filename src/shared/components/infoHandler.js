import React from 'react';
import Remarkable from 'remarkable';

import { connect } from 'react-redux';
import { locationShape } from 'react-router';
import request from 'superagent';
import { cancelableRequest } from '../utils/cancel';

import pick from 'lodash/pick';
import noop from 'lodash/noop';

// use remarkable to parse markdown documents
const md = new Remarkable();

/**
 * Snippets are stored on bitbucket https://bitbucket.org/snippets/youngshand/
 * If you want to add a new info page make sure the route has been added to the routes file
 * and add the snippet key and file name to this snippets object. The snippet must be
 * a markdown file so remarkable can render it.
 */
export const snippets = {
  '/local': {
    linkText: 'Setting up Locally',
    key: 'jxzxE',
    file: 'snippet.markdown'
  },
  '/updating': {
    linkText: 'Updating the framework',
    key: '7jM5n',
    file: 'snippet.markdown'
  },
  '/prototyping': {
    linkText: 'Getting started with prototyping',
    key: '4j8MX',
    file: 'snippet.markdown'
  },
  '/caching': {
    linkText: 'Getting started with cache',
    key: 'jxdGq',
    file: 'snippet.markdown'
  },
  '/deploying': {
    linkText: 'Deploying to the Live and Staging Servers',
    key: 'MqRqz',
    file: 'snippet.markdown'
  }
};


/**
 * The info handler renders info about this react framework.
 */
class InfoHandler extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
      cancel: noop // defining a noop allows us to call cancel it without checking for its existence
    };
  }

  /**
   * Get the content for the initial page load.
   */
  componentDidMount() {
    this.updateContent(this.props.location.pathname);
  }

  /**
   * If the location changes update what content is displayed.
   */
  componentWillUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.updateContent(nextProps.location.pathname);
    }
  }

  /**
   * Outstanding requests might be in progress. cancel them before unmounting the component.
   */
  componentWillUnmount() {
    // cancel any outstanding requests made in the update content function
    this.state.cancel();
  }

  /**
   * The info content is stored on bitbucket as a markdown snippet.
   * This makes a cancelable request for that content and sets it in the state when successful.
   *
   * @param {string} key The snippet key, or a route which should match those in the snippets object.
   */
  updateContent(key) {
    const snippet = snippets[key];
    const req = cancelableRequest(
      request.get(`https://bitbucket.org/!api/2.0/snippets/youngshand/${snippet.key}/master/files/${snippet.file}`)
    );

    // cancel any outstading requests
    this.state.cancel();

    // set the response text as our content when successful
    req.promise.then((data) => this.setState({ content: data.text }));

    // remove the old content and update the cancel function so the unmount can call it
    this.setState({ content: '', cancel: req.cancel });
  }

  render() {
    const content = this.state.content;
    const snippet = snippets[this.props.location.pathname];

    // The content does not take long enough to load for a loading component to be worth showing
    if (!content) {
      return false;
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: md.render(this.state.content) }}>
          </div>
          <hr />
          <p>If you want to make updates to this document <a href={`https://bitbucket.org/snippets/youngshand/${snippet.key}`} target="_blank" rel="noopener noreferrer">edit it on Bitbucket.</a></p>
        </div>
      );
    }
  }

}

InfoHandler.propTypes = {
  location: locationShape.isRequired,
};

/**
 * Returns only the props required for this component to render
 */
function mapStateToProps(state) {
  return pick(state, ['location']);
}

export default connect(mapStateToProps)(InfoHandler);
