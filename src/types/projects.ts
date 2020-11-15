interface Project {
  name: string;
  description: string;
  url: string;
}

class Projects extends Function {
  projectsList: Array<Project>;

  constructor (projectsList: Array<Project>) {
    super('...args', 'return this.execute(...args)')
    this.projectsList = projectsList
    return this.bind(this)
  }

  execute (args: Array<string>): string {
    if (args.length === 0 || args[0] === '') {
      return this.help()
    }
    switch (args[0]) {
      case 'list':
        return this.list().join(' ')
      case 'describe':
        return this.describe(args.slice(1))
      case 'help':
        return this.help()
    }
    return args.join(' ')
  }

  help (): string {
    return `
projects cli:
  help: print this message
  list: list projects
  describe: describe project
  run: run project
  `
  }

  list (): Array<string> {
    return this.projectsList.map(x => x.name)
  }

  describe (args: Array<string>) {
    if (args.length === 0 || args[0] === '') { return 'Provide project name' }
    if (!this.projectsList.map(x => x.name).includes(args[0])) { return 'Project not found' }
    return this.projectsList.filter(x => x.name === args[0])[0].description
  }
}

export {
  Project,
  Projects
}
