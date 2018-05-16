function(postChannels, ellipsis) {
  const possibleAnswers = require('options');
const rooms = require('rooms');
const crops = require('crops');
const Context = require('context');

let results = [];
rooms.forEach(eaRoom => {
  crops.forEach(eaCrop => {
    results.push({ room: eaRoom, crop: eaCrop, result: randomAnswer() });
  })
})

const context = new Context({
  todos: [],
  results: results,
  postChannels: postChannels.split(' ')
})

ellipsis.success("", {
  next: {
    actionName: "post-summary",
    args: [
      { name: "contextString", value: JSON.stringify(context) }
    ]
  }
});

function randomAnswer() {
  return possibleAnswers[Math.floor(Math.random()*possibleAnswers.length)];
}
}
