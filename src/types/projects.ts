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

  help (): string {
    return `
projects cli:
  help     : print this message
  list     : list projects
  describe : describe project
  open     : open project 
`
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
      case 'open':
        return this.open(args.slice(1))
    }
    return args.join(' ')
  }

  list (): Array<string> {
    return this.projectsList.map(x => x.name)
  }

  describe (args: Array<string>): string {
    if (args.length === 0 || args[0] === '') { return 'Provide project name' }
    if (!this.projectsList.map(x => x.name).includes(args.join(' '))) { return 'Project not found' }
    const project = this.projectsList.filter(x => x.name === args.join(' '))[0]
    return project.description + `

If you want to open this project site run

projects open ` + project.name
  }

  open (args: Array<string>): string {
    var project = this.projectsList.filter(x => x.name === args.join(' '))[0]
    window.open(project.url, "_blank")
    return 'Opening ' + project.url
  }

}

export {
  Project,
  Projects
}
