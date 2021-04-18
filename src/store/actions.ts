import { Command, ParsedCommand, Execution, Store } from '@/types'

const HELP_MESSAGE = `
Available commands:
  help     : prints this message
  history  : prints command history
  projects : view and manage projects
  contact  : prints contact info
`

export default {
  handleCommand: (store: Store, command: string): void => {
    const splited = command.split(' ')
    const parsedCommand = {
      command: splited[0],
      args: splited.slice(1)
    } as ParsedCommand
    if (store.state.commands.has(parsedCommand.command)) {
      store.dispatch('execute', parsedCommand)
    } else if (parsedCommand.command === '') {
      // TODO: factor this out
      store.commit('execute', { command: parsedCommand, result: ' ' })
    } else {
      store.dispatch('unknown', parsedCommand)
    }
    store.commit('resetIndex')
  },
  execute: (store: Store, pc: ParsedCommand): void => {
    store.commit('execute', {
      command: pc,
      result: (
        store.state.commands.get(pc.command) as Command
        ).execute(store.state, pc),
    })
  },
  help: (store: Store, pc: ParsedCommand): void => {
    store.commit('execute', {
      command: pc,
      result: HELP_MESSAGE
    } as Execution)
  },
  unknown: (store: Store, pc: ParsedCommand): void => {
    store.commit('execute', {
      command: pc,
      result: store.state.currentCommand + ' : command unkown'
    })
  },
  updateCommandFromHistory: (store: Store): void => {
    let newCommand: string
    if (store.state.historyIndex >= store.state.history.length) {
      newCommand = ''
    } else {
      const cmd = store.state.history[store.state.historyIndex].command
      newCommand = cmd.command + ' ' + cmd.args.join(' ')
    }
    store.commit('setCommand', newCommand)
  },
  historyPast: (store: Store): void => {
    store.commit('indexPast')
    store.dispatch('updateCommandFromHistory')
  },
  historyFuture: (store: Store): void => {
    store.commit('indexFuture')
    store.dispatch('updateCommandFromHistory')
  },
  scrollToConsoleBottom: (store: Store): void => {
    const container = document.querySelector('.console') as HTMLElement
    window.scrollTo(0, container.scrollHeight)
  }
}
