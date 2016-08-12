import React from 'react'; // react must be imported for stateless function
import request from 'superagent';
import Remarkable from 'remarkable';

// const keepingUptoDate = `
// On each new project
// `;

// const installNpmCheck = `
// npm install -g npm-check

// npm-check
// `;
const md = new Remarkable();


export default class StartUpdating extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
    }
  }

  componentDidMount() {
    request.get('https://bitbucket.org/!api/2.0/snippets/youngshand/7jM5n/master/files/react-framework-updating.markdown')
           .end((err, res) => {
             console.log('GOT', err, res);
             if (err) {
               console.error(err);
             } else {
              this.setState({ content: res.text });
             }
           });
  }

  render() {
    const content = this.state.content;

    console.log('CONTENT', content);

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

          <p>If you are not satisfied with this document update it on <a href="https://bitbucket.org/snippets/youngshand/7jM5n">Bitbucket</a></p>
        </div>
      )
    }
  }
}
