import { Projects } from './projects'

interface Command {
  command: string;
  args: Array<string>;
}

interface Execution {
  command: Command;
  result: string;
}

export {
  Command,
  Execution,
  Projects
}
