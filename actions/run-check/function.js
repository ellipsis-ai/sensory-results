function(contextString, ellipsis) {
  const Context = require('context');
const context = new Context(JSON.parse(contextString));

ellipsis.success(`Sensory check for \`${context.currentCrop}\` in \`${context.currentRoom}\`:`, {
  next: {
    actionName: "run-result-check",
    args: [
      { name: "contextString", value: contextString }
    ]
  }
});
}
