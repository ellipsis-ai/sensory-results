function(contextString, result, details, ellipsis) {
  const Context = require('context');
const context = new Context(JSON.parse(contextString));
const newResult = Object.assign({}, result, { details: details });
context.acceptResult(newResult, ellipsis);
}
