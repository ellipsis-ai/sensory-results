function(springMixMTR, babyRomaineMTR, babyArugulaMTR, babyKaleMTR, springMixMegalodon, babyRomaineMegalodon, babyArugulaMegalodon, babyKaleMegalodon, springMixKIT, babyRomaineKIT, babyArugulaKIT, babyKaleKIT, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const options = require('options');
const channel = ellipsis.userInfo.messageInfo.channel;
const user = ellipsis.userInfo.messageInfo.userId;

const legend = options.map(ea => `${ea.emoji} = ${ea.name}`).join(", ");
const summary = `
Sensory checklist has been completed by <@${user}>:
(${legend})

**MTR:**
${springMixMTR.emoji}   Spring mix
${babyRomaineMTR.emoji}   Baby romaine
${babyArugulaMTR.emoji}   Baby arugula
${babyKaleMTR.emoji}   Baby kale

**Megalodon:**
${springMixMegalodon.emoji}   Spring mix
${babyRomaineMegalodon.emoji}   Baby romaine
${babyArugulaMegalodon.emoji}   Baby arugula
${babyKaleMegalodon.emoji}   Baby kale

**KIT:**
${springMixKIT.emoji}   Spring mix
${babyRomaineKIT.emoji}   Baby romaine
${babyArugulaKIT.emoji}   Baby arugula
${babyKaleKIT.emoji}   Baby kale
`;

const channels = ["sensory-results"].filter(ea => ea != channel);
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
