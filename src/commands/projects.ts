import { Command, ParsedCommand, Project, State } from "@/types";


export default class Projects extends Function implements Command {

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

    execute (state: State, pc: ParsedCommand): string {
      if (pc.args.length === 0 || pc.args[0] === '') {
        return this.help()
      }
      switch (pc.args[0]) {
        case 'list':
          return this.list()
        case 'describe':
          return this.describe(pc.args.slice(1))
        case 'help':
          return this.help()
        case 'open':
          return this.open(pc.args.slice(1))
      }
      return pc.args.join(' ')
    }

    list (): string {
      const result = [] as Array<string>
      const nameBufferSize = Math.max(...this.projectsList.map(x => x.name.length)) + 1
      result.push('<b>Name</b>' + ' '.repeat(nameBufferSize - 4) + '<b>Info</b>')
      for (const project of this.projectsList) {
        result.push(project.name + ' '.repeat(nameBufferSize - project.name.length) + project.shortDescription)
      }
      return result.join('\n')
    }

    describe (args: Array<string>): string {
      if (args.length === 0 || args[0] === '') { return 'Provide project name' }
      if (!this.projectsList.map(x => x.name).includes(args.join(' ').trim())) { return 'Project not found' }
      const project = this.projectsList.filter(x => x.name === args.join(' ').trim())[0]
      return project.description + `

  Some technologies used include:
    ` + project.technologies.join('\n  ') + `

  If you want to open this project site run:

    projects open ` + project.name + `

  `
    }

    open (args: Array<string>): string {
      if (args.length === 0 || args[0] === '') { return 'Provide project name' }
      if (!this.projectsList.map(x => x.name).includes(args.join(' ').trim())) { return 'Project not found' }
      const project = this.projectsList.filter(x => x.name === args.join(' ').trim())[0]
      window.open(project.url, '_blank')
      return 'Opening ' + project.url
    }
}
