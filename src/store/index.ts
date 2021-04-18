import { createStore } from 'vuex'

import { Command, Execution, State } from '@/types'

import actions from './actions'

import data from '@/data'
import loadCommands from '@/commands'

export default createStore({
  state: {
    currentCommand: '' as string,
    history: [] as Array<Execution>,
    commands: loadCommands(data.projects),
    historyIndex: 0 as number
  } as State,
  mutations: {
    execute: (state, newExecution: Execution) => {
      state.history.push(newExecution)
    },
    setCommand: (state, newCommand: string) => {
      state.currentCommand = newCommand
    },
    resetIndex: (state) => {
      state.historyIndex = state.history.length
    },
    indexPast: (state) => {
      state.historyIndex = state.historyIndex > 0 ? state.historyIndex - 1 : 0
    },
    indexFuture: (state) => {
      state.historyIndex = state.historyIndex < state.history.length ? state.historyIndex + 1 : state.historyIndex
    }
  },
  actions: actions,
  modules: {
  }
})
