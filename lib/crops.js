/*
@exportId mu2Uxh-ZSh-E46jRXZkvYg
*/
module.exports = (function() {
const defaults = [
  "Spring mix",
  "Baby kale",
  "Spicy blend"
];

const byRoom = {
  "Megalodon": defaults.concat(["Baby romaine"])
};

return room => byRoom[room] || defaults;
})()
     