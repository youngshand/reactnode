import React from 'react';
import Remarkable from 'remarkable';

import { connect } from 'react-redux';
import { locationShape } from 'react-router';
import request from 'superagent';

import pick from 'lodash/pick';


// use remarkable to parse markdown documents
const md = new Remarkable();

/**
 * Snippets are stored on bitbucket https://bitbucket.org/snippets/youngshand/
 * If you want to add a new info page make sure the route has been added to the routes file
 * and add the snippet key and file name to this snippets object. The snippet must be
 * a markdown file so remarkable can render it.
 */
const snippets = {
  '/updating': {
    key: '7jM5n',
    file: 'snippet.markdown'
  },
  '/prototyping': {
    key: '4j8MX',
    file: 'snippet.markdown'
  },
  '/caching': {
    key: 'jxdGq',
    file: 'snippet.markdown'
  },
};

/**
 * The info handler renders info about this react framework.
 */
class InfoHandler extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
    }
  }

  componentDidMount() {
    this.updateContent(this.props.location.pathname);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.updateContent(nextProps.location.pathname);
    }
  }

  updateContent(key) {
    this.setState({ content: '' });

    const snippet = snippets[key];

    request.get(`https://bitbucket.org/!api/2.0/snippets/youngshand/${snippet.key}/master/files/${snippet.file}`)
           .end((err, res) => {
             if (err) {
               console.error(err);
             } else {
              this.setState({ content: res.text });
             }
           });
  }

  render() {
    const content = this.state.content;
    const snippet = snippets[this.props.location.pathname];

    // The
    if (!content) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: md.render(this.state.content) }}>
          </div>

          <p>If you want to make updates to this document <a href={`https://bitbucket.org/snippets/youngshand/${snippet.key}`} target="_blank" rel="noopener noreferrer">edit it on Bitbucket</a></p>
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
