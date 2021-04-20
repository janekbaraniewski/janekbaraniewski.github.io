import { Command, Directory, ParsedCommand, State } from '@/types'

export default class Cd extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    if (pc.args.length === 1) {
      if (!state.filesystem.setPath(pc.args[0])) {
        return 'path not found'
      }
    } else if (pc.args.length > 1) {
      return 'bad input'
    }
    return ''
  }
}
