function(postChannels, ellipsis) {
  const rooms = require('rooms');
const choices = rooms.map(choiceFor);

const intro = `
:nose: Hello, this is the Sensory Results Checklist skill. 

If you ever need to run the checklist manually, you can type \`…run sensory checklist posting to ${postChannels}\`.

Once you choose a room, you will be asked if each crop is a \`Pass\`, a \`Caution\`, a \`Fail\` or \`N/A\` if a sensory test wasn't performed.

Click a room when you are ready to provide scores.
`;
ellipsis.success(intro, {
  choices: choices
});

function choiceFor(room) {
  return {
    label: room,
    actionName: "start-checklist", 
    args: [ 
      { name: "room", value: room },
      { name: "postChannels", value: postChannels }
    ],
    allowMultipleSelections: true,
    allowOthers: true
  };
}
}
