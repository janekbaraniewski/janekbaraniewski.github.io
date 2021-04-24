import { Command, ParsedCommand, State } from '@/types'

export default class Mkdir extends Function implements Command {
  constructor () {
    super('...args', 'return this.execute(...args)')
    return this.bind(this)
  }

  execute (state: State, pc: ParsedCommand): string {
    if (pc.args.length === 1) {
      const splited = pc.args[0].split('/').filter(element => element.length > 0)
      const fileName = splited[splited.length - 1]
      if (
        !state.filesystem
          .addDir(
            pc.args[0].substring(
              0,
              pc.args[0].length - ('/' + fileName).length
            ),
            fileName
          )
      ) {
        return 'dir exists'
      }
    } else if (pc.args.length > 1) {
      return 'bad input'
    }
    return ''
  }
}
