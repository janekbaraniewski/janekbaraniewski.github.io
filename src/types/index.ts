interface Project {
  name: string;
  shortDescription: string;
  description: string;
  url: string;
  technologies: Array<string>;
}

interface File {
  name: string;
  content: string;
}

interface Directory {
  name: string;
  content: Array<File | Directory>;
}

interface Filesystem {
  pwd: string;
  root: Directory;
  getCurrentDir (): Directory;
  getDir (path: string): Directory;
  getFromDir (path: string, dir: Directory): Directory;
}

interface Store {
  state: State;
  dispatch (command: string, args?: any): void;
  commit (command: string, args?: any): void;
}

interface State {
  commands: Map<string, Command>;
  currentCommand: string;
  projectsList: Array<Project>;
  filesystem: Filesystem;
  history: Array<Execution>;
  historyIndex: number;
}

interface ParsedCommand {
  command: string;
  args: Array<string>;
}

interface Command {
  execute: (state: State, pc: ParsedCommand) => string;
}

interface Execution {
  command: ParsedCommand;
  result: string;
}

interface KeyEvent {
  keyCode: number;
  preventDefault: () => void;
}

export {
  Command,
  Directory,
  Execution,
  File,
  Filesystem,
  KeyEvent,
  ParsedCommand,
  Project,
  Store,
  State
}
