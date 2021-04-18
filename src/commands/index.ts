import { Command, Project } from '@/types';

import Compgen from './compgen';
import Contact from './contact';
import History from './history';
import Projects from './projects';

export default (projects: Array<Project>): Map<string, Command> => {
    // TODO: commands should register themself automatically
    var availableCommands = new Map() as Map<string, Command>
    availableCommands.set('history', new History())
    availableCommands.set('contact', new Contact())
    availableCommands.set('projects', new Projects(projects))
    availableCommands.set('compgen', new Compgen(availableCommands.keys()))
    return availableCommands
}
