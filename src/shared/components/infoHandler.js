import React from 'react';
import Remarkable from 'remarkable';

import { connect } from 'react-redux';
import { locationShape } from 'react-router';
import request from 'superagent';

import pick from 'lodash/pick';


// use remarkable to parse markdown documents
const md = new Remarkable();
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
    console.log('UPDATING', nextProps.location.pathname);
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

    if (!content) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      console.log('CONTENT', content);

      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: md.render(this.state.content) }}>
          </div>

          <p>If you are not satisfied with this document update it on <a href={`https://bitbucket.org/snippets/youngshand/${snippet.key}`}>Bitbucket</a></p>
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
  console.log('LOC', state.toJS().location);
  return pick(state.toJS(), ['location']);
}

export default connect(mapStateToProps)(InfoHandler);
