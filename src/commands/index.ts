import { Command, Project } from '@/types'

import Compgen from './compgen'
import Contact from './contact'
import History from './history'
import Projects from './projects'

export default (projectsList: Array<Project>): Map<string, Command> => {
  // TODO: commands should register themself automatically
  const projects = new Projects(projectsList)
  const availableCommands = new Map() as Map<string, Command>
  console.log(projects.projectsList)
  availableCommands.set('history', new History())
  availableCommands.set('contact', new Contact())
  availableCommands.set('projects', projects)
  availableCommands.set('compgen', new Compgen(availableCommands.keys()))
  return availableCommands
}
