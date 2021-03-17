export class Blog {
  constructor(data = {}) {
    this.id = data.id || data._id || ''
    this.title = data.title || ''
    this.description = data.description || ''
    this.author = data.author || { name: 'uknown', picture: '//placehold.it/20x20' }
    this.comments = data.comments || []
  }
}
