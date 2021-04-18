import { Command, ParsedCommand, State } from '@/types'

export default class Contact extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    return `
  You can find me on:

  - <a href="https://github.com/janekbaraniewski" target="_blank">Github</a>
`
  }
}
