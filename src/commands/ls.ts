import { Command, Directory, ParsedCommand, State } from '@/types'

export default class Ls extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    let directory = state.filesystem.getCurrentDir()
    console.log(directory)
    if (pc.args.length > 0) {
      if (pc.args[0].startsWith('/')) {
        directory = state.filesystem.getDir(pc.args[0])
      } else {
        directory = state.filesystem.getFromDir(pc.args[0], directory)
      }
    }
    return directory.content.map(val => { return val.name }).join(' ')
  }
}
