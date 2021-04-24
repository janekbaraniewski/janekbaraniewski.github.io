import { Command } from '@/types'

import Compgen from './compgen'
import Contact from './contact'
import History from './history'
import Projects from './projects'
import Ls from './ls'
import Cat from './cat'
import Pwd from './pwd'
import Cd from './cd'
import Exit from './exit'
import Mkdir from './mkdir'

export default (): Map<string, Command> => {
  // TODO: commands should register themself automatically
  const availableCommands = new Map() as Map<string, Command>
  availableCommands.set('history', new History())
  availableCommands.set('contact', new Contact())
  availableCommands.set('projects', new Projects())
  availableCommands.set('compgen', new Compgen())
  availableCommands.set('ls', new Ls())
  availableCommands.set('cat', new Cat())
  availableCommands.set('pwd', new Pwd())
  availableCommands.set('cd', new Cd())
  availableCommands.set('exit', new Exit())
  availableCommands.set('mkdir', new Mkdir())
  return availableCommands
}
