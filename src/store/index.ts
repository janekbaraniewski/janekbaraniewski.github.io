import { createStore } from 'vuex'

import { Execution, State } from '@/types'

import actions from './actions'

import loadCommands from '@/commands'
import data from '@/data'
import filesystem from '@/filesystem'

export default createStore({
  state: {
    currentCommand: '' as string,
    filesystem: filesystem,
    history: [] as Array<Execution>,
    projectsList: data.projects,
    commands: loadCommands(),
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
