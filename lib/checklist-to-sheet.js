/*
@exportId Bjsdgqe1S5mB_iQEH4bSAg
*/
module.exports = (function() {
const moment = require('moment-timezone');

return {
  save: function(ellipsis, spreadsheetId, checklistTitle, questionsAndAnswers) {
    const Sheet = ellipsis.require('ellipsis-gsheets@^0.0.1').Sheet;
    const doc = new Sheet(ellipsis, spreadsheetId);
    const timestamp = moment().tz(ellipsis.team.timeZone).format("M/D/YYYY h:mm A");
    const user = `${ellipsis.event.user.fullName || "Unknown user"} <${ellipsis.event.user.email || "unknown email"}>`;
    const checklist = Object.keys(questionsAndAnswers).map((question) => {
      const result = questionsAndAnswers[question];
      let answer = result.name;
      if (result.details) {
        answer += `\nDetails: ${result.details}`;
      }
      return {
        question: question,
        result: answer
      };
    });
    return ensureSheet(doc, checklistTitle).then(() => addData(doc, checklistTitle, timestamp, user, checklist));
  }
}

function ensureSheet(doc, checklistTitle) {
  return doc.getAllSheets().then((sheets) => {
    const sheetExists = sheets.some((ea) => ea.name === checklistTitle);
    if (sheetExists) {
      return Promise.resolve(true);
    } else {
      return doc.createSheet(checklistTitle).then((sheetInfo) => {
        if (sheetInfo.id) {
          return true;
        }
      });
    }
  });
}

function addData(doc, checklistTitle, timestamp, user, checklist) {
  return doc.get(checklistTitle).then((existingRows) => {
    const existingFirstRow = Boolean(existingRows[0] && existingRows[0].length >= 2);
    const firstRow = existingRows[0] || ["Timestamp", "User"];
    const newRow = [timestamp, user];
    let updateFirstRow = false;
    checklist.forEach((item) => {
      let index = firstRow.findIndex((cell) => cell === item.question);
      if (index < 2) {
        updateFirstRow = true;
        index = firstRow.length;
        firstRow[index] = item.question;
      }
      newRow[index] = item.result;
    });
    for (let i = 0; i < newRow.length; i++) {
      if (!newRow[i]) {
        newRow[i] = "";
      }
    }
    const rowsToAdd = [];
    if (!existingFirstRow) {
      rowsToAdd.push(firstRow);
    }
    rowsToAdd.push(newRow);
    return doc.append(checklistTitle, rowsToAdd).then(() => {
      if (existingFirstRow && updateFirstRow) {
        return doc.update(`${checklistTitle}!A1`, [firstRow]).then(() => true);
      } else {
        return Promise.resolve(true);
      }
    });
  });
}

})()
     