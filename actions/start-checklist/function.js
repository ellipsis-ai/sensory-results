function(postChannels, room, isAllGood, ellipsis) {
  const crops = require('crops');
const Context = require('context');
const passResult = require('options')[0];

if (isAllGood) {
  const results = {};
  crops.forEach(ea => results[ea] = passResult);
  const context = new Context({
    postChannels: postChannels.split(' '),
    room: room,
    results: results,
    cropsTodo: []    
  });
  ellipsis.success(`Great. I'll post this in ${postChannels}`, {
    next: {
      actionName: "post-summary",
      args: [
        { name: "contextString", value: JSON.stringify(context) }
      ]
    }
  });
} else {
  const context = Context.initialFor(crops, room, postChannels); 
  ellipsis.success("OK, let's get started…", {
    next: {
      actionName: "run-check",
      args: [
        { name: "contextString", value: JSON.stringify(context) }
      ]
    }
  });
}
}
