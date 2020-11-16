import { Projects } from './projects'

interface Store {
  state: State;
  dispatch (command: string, args?: any): void;
  commit (command: string, args?: any): void;
}

interface State {
  availableCommands: Array<string>;
  currentCommand: string;
  history: Array<Execution>;
  historyIndex: number;
}

interface Command {
  command: string;
  args: Array<string>;
}

interface Execution {
  command: Command;
  result: string;
}

interface KeyEvent {
  keyCode: number;
}

export {
  Command,
  Execution,
  KeyEvent,
  Projects,
  Store,
  State
}
