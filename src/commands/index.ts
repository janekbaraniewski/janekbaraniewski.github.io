import { Command } from '@/types'

import Compgen from './compgen'
import Contact from './contact'
import History from './history'
import Projects from './projects'
import Ls from './ls'
import Cat from './cat'

export default (): Map<string, Command> => {
  // TODO: commands should register themself automatically
  const availableCommands = new Map() as Map<string, Command>
  availableCommands.set('history', new History())
  availableCommands.set('contact', new Contact())
  availableCommands.set('projects', new Projects())
  availableCommands.set('compgen', new Compgen())
  availableCommands.set('ls', new Ls())
  availableCommands.set('cat', new Cat())
  return availableCommands
}
