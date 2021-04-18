import { Command, ParsedCommand, State } from '@/types'

export default class History extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    return state.history.map(
      x => x.command.command + ' ' + x.command.args.join(' ')
    ).filter(
      x => x.trim().length > 0
    ).concat(
      [pc.command + ' ' + pc.args.join(' ')]
    ).join('\n')
  }
}
