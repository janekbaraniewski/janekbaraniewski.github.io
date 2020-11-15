import { createStore } from 'vuex'

import { Command, Execution, Projects } from '@/types'

const HELP_MESSAGE = `
Available commands: 
  help: print this message
  history: print command history
  projects: view and manage projects
  contact: print contact info
`

const projects = new Projects([])

export default createStore({
  state: {
    currentCommand: '' as string,
    history: [] as Array<Execution>,
    availableCommands: [
      'help', 'projects', 'contact', 'history'
    ] as Array<string>
  },
  mutations: {
    execute: (state, newExecution: Execution) => {
      state.history.push(newExecution)
    },
    setCommand: (state, newCommand: string) => {
      state.currentCommand = newCommand
    }
  },
  actions: {
    handleCommand: (store, command: string): void => {
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
    },
    help: (store, pc: Command): void => {
      store.commit('execute', {
        command: pc,
        result: HELP_MESSAGE
      } as Execution)
    },
    projects: (store, pc: Command): void => {
      store.commit('execute', {
        command: pc,
        result: projects(pc.args)
      })
    },
    contact: (store, pc: Command): void => {
      store.commit('execute', {
        command: pc,
        result: 'contact info TODO'
      })
    },
    unknown: (store, pc: Command): void => {
      store.commit('execute', {
        command: pc,
        result: store.state.currentCommand + ' : command unkown'
      })
    },
    history: (store, pc: Command): void => {
      store.commit('execute', {
        command: pc,
        result: store.state.history.map(
          x => x.command.command + ' ' + x.command.args.join(' ')
        ).concat([pc.command + ' ' + pc.args.join(' ')]).join('\n')
      })
    }
  },
  modules: {
  }
})
