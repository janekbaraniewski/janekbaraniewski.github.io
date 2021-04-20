import { Command, File, ParsedCommand, State } from '@/types'

export default class Cat extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    if (pc.args.length === 0) {
      return ''
    }
    return (
      state.filesystem.getCurrentDir()
        .content.filter(value => value.name === pc.args[0])[0] as unknown as File
    ).content
  }
}
