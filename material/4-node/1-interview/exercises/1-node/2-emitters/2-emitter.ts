import { EventEmitter } from 'events'
import { lengthyProcess1, lengthyProcess2, lengthyProcess3 } from './functions'

export class FileProcessor extends EventEmitter {
  async processFile(fileId: number, data: string) {
    try {
      this.emit('status', fileId, 'processing')
      this.emit('progress', fileId, 0)

      await lengthyProcess1(data)
      this.emit('progress', fileId, 30)

      await lengthyProcess2(data)
      this.emit('progress', fileId, 60)

      await lengthyProcess3(data)
      this.emit('progress', fileId, 100)

      this.emit('status', fileId, 'done')
    } catch (error) {
      this.emit('status', fileId, 'error')
      this.emit('error', fileId, error)
    }
  }
}
