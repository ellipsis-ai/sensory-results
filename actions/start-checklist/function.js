function(postChannels, ellipsis) {
  const crops = require('crops');
const rooms = require('rooms');
const Context = require('context');
const context = Context.initialFor(crops, rooms, postChannels); 

ellipsis.success("OK, let's get started…", {
  next: {
    actionName: "run-check",
    args: [
      { name: "contextString", value: JSON.stringify(context) }
    ]
  }
})
}
