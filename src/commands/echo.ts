import { Command, Directory, ParsedCommand, State } from '@/types'

export default class Echo extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    return pc.args.join(' ')
  }
}
