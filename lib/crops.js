/*
@exportId mu2Uxh-ZSh-E46jRXZkvYg
*/
module.exports = (function() {
const defaults = [
  "Spring mix",
  "Baby kale",
  "Spicy blend",
  "Baby romaine"
];

const byRoom = {
};

return room => byRoom[room] || defaults;
})()
     