import React from 'react'; // react must be imported for stateless function

const installNpmCheck = `
  npm install -g npm-check

  npm-check
`;

export default function StartUpdating() {
  return (
    <div>
      <h3>Updating the framework</h3>
      <code dangerouslySetInnerHTML={{ __html: installNpmCheck }}></code>
    </div>
  );
}
