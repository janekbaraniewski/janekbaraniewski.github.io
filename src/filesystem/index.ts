import { Directory, File, Filesystem } from '@/types'

const stringWithoutSuffix = (word: string, suffix: string): string =>
  word.endsWith(suffix) && word.length > suffix.length
    ? word.substring(0, word.length - suffix.length) : word

const withoutSlash = (word: string): string =>
  stringWithoutSuffix(word, '/')

export default {
  pwd: '/home',
  home: '/home',
  root: {
    name: '/',
    content: [
      {
        name: 'home',
        content: [
            {
              name: 'hello.txt',
              content: `
hello... ;)\n
`
            } as File
        ]
      } as Directory
    ]
  } as Directory,
  getCurrentDir: function (): Directory {
    return this.getDir(this.pwd)
  },
  getDir: function (path: string): Directory {
    return this.getFromDir(path, this.root)
  },
  getFromDir: function (path: string, dir: Directory): Directory {
    let resultDir = dir as Directory
    path.split('/').filter(value => value.trim() !== '').forEach(dirName => {
      resultDir = resultDir.content.filter(value => {
        return value.name === dirName
      })[0] as unknown as Directory
    })
    return resultDir
  },
  setPath: function (path: string): boolean {
    const newPath = this.normalizePath(path)
    const result = this.getDir(newPath)
    if (result !== undefined) {
      this.pwd = newPath
      return true
    }
    return false
  },
  expandParentDir: function (path: string, parent: string): string {
    if (path.length === 0) {
      return parent
    }
    const countUp = (path.match(/\.\.\//g) || []).length
    if (countUp === 0) {
      return withoutSlash(parent + '/' + path)
    }
    const newParent = parent.split('/').slice(0, -countUp < parent.split('/').length - 1 ? -countUp : 0).join('/')
    path = withoutSlash(path.replaceAll('../', ''))
    return path.length > 0 ? newParent + '/' + path : newParent
  },
  handleParentDir: function (path: string): string {
    if (!path.includes('../')) {
      return path
    }

    let root = this.pwd

    if (path.startsWith('/')) {
      root = this.root.name
      path = path.substring(1)
    }

    (path.match(/(\.\.\/)*[a-zA-Z0-9!-)/]*\/?/g) || [])
      .filter(element => element.length > 0)
      .forEach(element => {
        root = this.expandParentDir(element, root)
        if (root.length === 0) {
          root = '/'
        }
      })
    return root
  },
  normalizePath: function (path: string): string {
    if (path.startsWith('~')) path = path.replace('~', this.home)

    const newPath = this.handleParentDir(path)

    if (newPath.startsWith('/')) return withoutSlash(newPath)

    if (this.pwd === '/') return withoutSlash(this.pwd + newPath)

    return withoutSlash(this.pwd + '/' + newPath)
  }
} as Filesystem
