import { Command, Execution, Store } from '@/types'

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
    } as Command
    if (store.state.availableCommands.includes(parsedCommand.command)) {
      store.dispatch(parsedCommand.command, parsedCommand)
    } else if (parsedCommand.command === '') {
      store.commit('execute', { command: parsedCommand, result: ' ' })
    } else {
      store.dispatch('unknown', parsedCommand)
    }
    store.commit('resetIndex')
  },
  help: (store: Store, pc: Command): void => {
    store.commit('execute', {
      command: pc,
      result: HELP_MESSAGE
    } as Execution)
  },
  projects: (store: Store, pc: Command): void => {
    store.commit('execute', {
      command: pc,
      result: store.state.projectsCLI(pc.args)
    })
  },
  contact: (store: Store, pc: Command): void => {
    store.commit('execute', {
      command: pc,
      result: ` 
You can find me on:

- <a href="https://github.com/janekbaraniewski" target="_blank">Github</a>
`
    })
  },
  unknown: (store: Store, pc: Command): void => {
    store.commit('execute', {
      command: pc,
      result: store.state.currentCommand + ' : command unkown'
    })
  },
  history: (store: Store, pc: Command): void => {
    store.commit('execute', {
      command: pc,
      result: store.state.history.map(
        x => x.command.command + ' ' + x.command.args.join(' ')
      ).concat([pc.command + ' ' + pc.args.join(' ')]).join('\n')
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
  }
}
