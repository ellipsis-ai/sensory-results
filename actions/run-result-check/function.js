function(contextString, result, ellipsis) {
  const Context = require('context');
const context = new Context(JSON.parse(contextString));
const C = require('skill-constants');

if (result.id === C.CAUTION || result.id === C.FAIL) {
  ellipsis.success("", {
    next: {
      actionName: "run-followup",
      args: [
        { name: "contextString", value: contextString },
        { name: "result", value: result.id }
      ]
    }
  });
} else {
  context.acceptResult(result, ellipsis);
}
}
