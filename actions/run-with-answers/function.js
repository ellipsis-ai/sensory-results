function(ellipsis) {
  const possibleAnswers = ["Pass", "Fail", "N/A"];

ellipsis.success("", {
  next: {
    actionName: "run-checklist",
    args: [
      { name: "springMixMTR", value: randomAnswer() },
      { name: "babyRomaineMTR", value: randomAnswer() },
      { name: "babyArugulaMTR", value: randomAnswer() },
      { name: "babyKaleMTR", value: randomAnswer() },
      { name: "springMixMegalodon", value: randomAnswer() },
      { name: "babyRomaineMegalodon", value: randomAnswer() },
      { name: "babyArugulaMegalodon", value: randomAnswer() },
      { name: "babyKaleMegalodon", value: randomAnswer() },
      { name: "springMixKIT", value: randomAnswer() },
      { name: "babyRomaineKIT", value: randomAnswer() },
      { name: "babyArugulaKIT", value: randomAnswer() },
      { name: "babyKaleKIT", value: randomAnswer() }
    ]
  }
});

function randomAnswer() {
  return possibleAnswers[Math.floor(Math.random()*possibleAnswers.length)];
}
}
