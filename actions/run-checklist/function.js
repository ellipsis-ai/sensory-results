function(springMixMTR, babyRomaineMTR, babyArugulaMTR, babyKaleMTR, springMixMegalodon, babyRomaineMegalodon, babyArugulaMegalodon, babyKaleMegalodon, springMixKIT, babyRomaineKIT, babyArugulaKIT, babyKaleKIT, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);

const channel = ellipsis.userInfo.messageInfo.channel;
const user = ellipsis.userInfo.messageInfo.userId;

const PASS = ":white_check_mark:";
const FAIL = ":x:";
const NOT_APPLICABLE = ":heavy_minus_sign:";

const summary = `
Sensory checklist has been completed by <@${user}>:
(${PASS} = Pass, ${FAIL} = Fail, ${NOT_APPLICABLE} = N/A)

**MTR:**
${checkFor(springMixMTR)}   Spring mix
${checkFor(babyRomaineMTR)}   Baby romaine
${checkFor(babyArugulaMTR)}   Baby arugula
${checkFor(babyKaleMTR)}   Baby kale

**Megalodon:**
${checkFor(springMixMegalodon)}   Spring mix
${checkFor(babyRomaineMegalodon)}   Baby romaine
${checkFor(babyArugulaMegalodon)}   Baby arugula
${checkFor(babyKaleMegalodon)}   Baby kale

**KIT:**
${checkFor(springMixKIT)}   Spring mix
${checkFor(babyRomaineKIT)}   Baby romaine
${checkFor(babyArugulaKIT)}   Baby arugula
${checkFor(babyKaleKIT)}   Baby kale
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

function checkFor(result) {
  if (result.id === "Pass") {
    return PASS;
  } else if (result.id === "Fail") {
    return FAIL;
  } else {
    return NOT_APPLICABLE;
  }
}
}
