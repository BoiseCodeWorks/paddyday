import { reactive } from 'vue'
import { Blog } from './models/Blog'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  blogs: [],
  activeBlog: new Blog({})
})
