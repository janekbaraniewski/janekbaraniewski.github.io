import { Project } from './projects'

interface Store {
  state: State;
  dispatch (command: string, args?: any): void;
  commit (command: string, args?: any): void;
}

interface State {
  commands: Map<string, Command>;
  currentCommand: string;
  history: Array<Execution>;
  historyIndex: number;
}

interface ParsedCommand {
  command: string;
  args: Array<string>;
}

interface Command {
  execute: (state: State,pc: ParsedCommand) => string;
}

interface Execution {
  command: ParsedCommand;
  result: string;
}

interface KeyEvent {
  keyCode: number;
}

export {
  Command,
  Execution,
  KeyEvent,
  ParsedCommand,
  Project,
  Store,
  State
}
