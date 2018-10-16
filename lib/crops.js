/*
@exportId mu2Uxh-ZSh-E46jRXZkvYg
*/
module.exports = (function() {
const defaults = [
  "Spring mix",
  "Baby romaine",
  "Baby arugula",
  "Baby kale"
];

const byRoom = {
  "MTR": defaults.concat(["Spicy blend"])
};

return room => byRoom[room] || defaults;
})()
     