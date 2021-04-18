import { Command, ParsedCommand, State } from '@/types'

export default class Compgen extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    return [pc.args.map(val => {
      switch (val) {
        case '-c':
          return this.c(state)
      }
    })].join('\n')
  }

  c (state: State): string {
    return [...state.commands.keys()].sort().join('\n')
  }
}
