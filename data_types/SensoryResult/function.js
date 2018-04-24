function(ellipsis) {
  const options = require('options');

ellipsis.success(options.map(ea => {
  return { label: `${ea.emoji} ${ea.name}`, id: ea.name, emoji: ea.emoji }
}));
}
