import { Directory, File, Filesystem } from '@/types'

export default {
  pwd: '/home',
  root: {
    name: '/',
    content: [
      {
        name: 'home',
        content: [
            {
              name: 'hello.txt',
              content: 'hello\n'
            } as File
        ]
      } as Directory
    ]
  } as Directory,
  getCurrentDir: function (): Directory {
    return this.getDir(this.pwd)
  },
  getDir: function (path: string): Directory {
    console.log(path)
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
  }
} as Filesystem
