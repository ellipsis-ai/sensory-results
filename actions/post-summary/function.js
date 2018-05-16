function(contextString, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const options = require('options');
const channel = ellipsis.userInfo.messageInfo.channel;
const user = ellipsis.userInfo.messageInfo.userId;
const Context = require('context');
const context = new Context(JSON.parse(contextString));

const rooms = require('rooms');
const resultsText = rooms.map(ea => {
  return resultsTextForRoom(ea);
}).join("\n\n");

const legend = options.map(ea => `${ea.emoji} = ${ea.name}`).join(", ");
const summary = `
Sensory checklist has been completed by <@${user}>:
(${legend})

${resultsText}
`;

function resultsTextForRoom(room) {
  const resultLines = context.resultsForRoom(room).map(ea => {
    return resultFor(ea);
  }).join("\n");
  return `**${room}**\n${resultLines}`;
}

function resultFor(r) {
  return `${r.result.emoji}  ${r.crop}  ${detailsFor(r.result)}`.trim();
}

function detailsFor(result) {
  if (result.details) {
    return `_details: ${result.details.trim()}_`;
  } else {
    return "";
  }
}

const channels = ["bot"].filter(ea => ea != channel);
api.say({ message: summary }).then(res => {
  Promise.all(channels.map(postSummaryTo)).then(ellipsis.noResponse);                                 
});

function postSummaryTo(channel) {
  return api.run({
    actionName: "post-checklist-summary",
    args: [{ name: "summary", value: summary }],
    channel: channel
  });
}
}
