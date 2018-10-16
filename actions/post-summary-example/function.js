function(postChannels, ellipsis) {
  const possibleAnswers = require('options');
const rooms = require('rooms');
const getCrops = require('crops');
const Context = require('context');

const room = rooms[0];
let results = {};
const crops = getCrops(room);
crops.forEach(ea => {
  results[ea] = randomAnswer();
});

const context = new Context({
  room: room,
  cropsTodo: crops,
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
