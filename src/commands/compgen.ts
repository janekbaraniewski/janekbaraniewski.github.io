import { Command, ParsedCommand, State } from '@/types'

export default class Compgen extends Function implements Command {
    commands: IterableIterator<string>;

    constructor (commands: IterableIterator<string>) {
      super('...args', 'return this.execute(...args)')
      this.commands = commands
      return this.bind(this)
    }

    execute (state: State, pc: ParsedCommand): string {
    //   pc.args.forEach(arg => {})
      return ''
    }
}
