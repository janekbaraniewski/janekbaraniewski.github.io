import { Command, ParsedCommand, State } from '@/types'

export default class Exit extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    window.close()
    return ''
  }
}
