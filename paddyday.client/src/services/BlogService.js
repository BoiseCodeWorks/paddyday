import { AppState } from '../AppState'
import { Blog } from '../models/Blog'
import { api } from './AxiosService'

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data.map(b => new Blog(b))
  }

  async createBlog(blog) {
    delete blog.id
    const res = await api.post('api/blogs', blog)
    AppState.blogs.unshift(new Blog(res.data))
  }

  async editBlog(blog) {
    const res = await api.put('api/blogs/' + blog.id, blog)
    const i = AppState.blogs.findIndex(b => b.id === blog.id)
    AppState.blogs.splice(i, 1, new Blog(res.data))
  }

  async addComment(blogId, comment) {
    const res = await api.post(`api/blogs/${blogId}/comments`, comment)
    const i = AppState.blogs.findIndex(b => b.id === blogId)
    AppState.blogs.splice(i, 1, new Blog(res.data))
  }
}

export const blogService = new BlogService()
