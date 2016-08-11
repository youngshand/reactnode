export default function errorHandling(message, file, line, column, errorObject) {
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
