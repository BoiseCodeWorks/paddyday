import mongoose from 'mongoose'
import { Blog } from '../models/Blog'
import AccountSchema from '../models/Account'

class DbContext {
  Blogs = mongoose.model('Blog', Blog);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
