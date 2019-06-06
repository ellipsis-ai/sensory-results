function(contextString, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const options = require('options');
const channel = ellipsis.userInfo.messageInfo.channel;
const user = ellipsis.userInfo.messageInfo.userId;
const Context = require('context');
const context = new Context(JSON.parse(contextString));
const ChecklistToSheet = require('checklist-to-sheet');

const legend = options.map(ea => `${ea.emoji} = ${ea.name}`).join(", ");
const summary = `
Sensory checklist for ${context.room} has been completed by <@${user}>:
(${legend})

${resultsText()}
`;

function resultsText() {
  return Object.keys(context.results).map(crop => {
    return resultFor(crop, context.resultFor(crop));
  }).join("\n");
}

function resultFor(crop, result) {
  return `${result.emoji}  ${crop}  ${detailsFor(result)}`.trim();
}

function detailsFor(result) {
  if (result.details) {
    return `_details: ${result.details.trim()}_`;
  } else {
    return "";
  }
}

const channels = context.postChannels.filter(ea => ea != channel);
api.say({ message: summary })
  .then(() => ChecklistToSheet.save(ellipsis, ellipsis.env.SYSTEMS_CHECKLISTS_SPREADSHEET_ID, `Sensory checklist for ${context.facility}-${context.room}`, context.results))
  .then(() => Promise.all(channels.map(postSummaryTo)))
  .then(() => ellipsis.noResponse());

function postSummaryTo(channel) {
  return api.run({
    actionName: "post-checklist-summary",
    args: [{ name: "summary", value: summary }],
    channel: channel
  });
}
}
