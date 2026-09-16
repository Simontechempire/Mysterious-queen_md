const commands = new Map();

export function registerCommand(name, handler) {
  commands.set(name.toLowerCase(), handler);
}

export function getCommand(name) {
  return commands.get(name.toLowerCase());
}

export function getCommands() {
  return commands;
}
