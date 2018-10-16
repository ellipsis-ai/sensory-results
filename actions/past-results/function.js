function(fromYear, fromMonth, fromDay, ellipsis) {
  const dedupe = require('dedupe')
const moment = require('moment-timezone');
const getActionLogs = require('ellipsis-action-logs').get;
const from = moment(`${fromYear}-${fromMonth}-${fromDay}`).toDate();

function filterOutAdminLogs(logs) {
  return logs.filter(ea => ea.userIdForContext.trim() !== "U1UAAL631");
}

function filterOutDuplicates(logs) {
  const datedSummaries = logs.map(ea => {
    return { 
      date: moment(ea.timestamp).startOf('day').format("YYYY-MM-DD"),
      summary: ea.paramValues.summary 
    };
  });
  return dedupe(datedSummaries);
}

function prepareLogs(logs) {
  const sorted = logs.sort((a, b) => moment(a.timestamp).toDate() - moment(b.timestamp).toDate());
  return filterOutDuplicates(filterOutAdminLogs(sorted));
}

getActionLogs({ 
  action: "post-checklist-summary",
  from: from,
  to: new Date(),
  ellipsis: ellipsis,
  success: res => {
    ellipsis.success(`Here are the results since ${fromYear}-${fromMonth}-${fromDay}:`, {
      files: [{
        content: prepareLogs(res).map(ea => `${ea.date}: ${ea.summary}`).join("\n")
      }]
    })
  },
  error: ellipsis.error
});
}
