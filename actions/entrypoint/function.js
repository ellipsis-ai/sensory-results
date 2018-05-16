function(postChannels, ellipsis) {
  const intro = `
:nose: Hello, this is the Sensory Results Checklist skill. 

If you ever need to run the checklist manually, you can type \`…run sensory checklist posting to ${postChannels}\`.

You will be asked, for each crop in each grow room, if it is a \`Pass\`, a \`Caution\`, a \`Fail\` or \`N/A\` if a sensory test wasn't performed.

When you're ready, click \`Start\`
`;
ellipsis.success(intro, {
  choices: [{
    label: "Start",
    actionName: "start-checklist",
    args: [ { name: "postChannels", value: postChannels } ],
    allowOthers: true
  }]
});
}
