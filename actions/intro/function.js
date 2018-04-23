function(ellipsis) {
  const intro = `
:nose: Hello, this is the Sensory Results Checklist reminder. 

When you're ready, click \`Start\`.
`;
ellipsis.success(intro, {
  choices: [{
    label: "Start",
    actionName: "run-checklist",
    allowOthers: true
  }]
});
}
