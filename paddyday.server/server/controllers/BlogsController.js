import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from '../db/DbContext'

export class BlogsController extends BaseController {
  constructor() {
    super('api/blogs')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .post('/:id/comments', this.addComment)
      .delete('/:blogId/comments/:commentId', this.removeComment)
  }

  async getAll(req, res, next) {
    try {
      const blogs = await dbContext.Blogs.find({})
      return res.send(blogs)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const blog = await dbContext.Blogs.create(req.body)
      return res.send(blog)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.comments
      const blog = await dbContext.Blogs.findOneAndUpdate({
        _id: req.params.id,
        creatorId: req.userInfo.id
      }, {
        ...req.body
        // hard mode $set: { title: req.body.title, description: req.body.description }
      }, { new: true, runValidators: true })
      return res.send(blog)
    } catch (error) {
      next(error)
    }
  }

  async addComment(req, res, next) {
    try {
      // attach the creatorId
      req.body.creatorId = req.userInfo.id
      const blog = await dbContext.Blogs.findByIdAndUpdate(req.params.id, { $push: { comments: req.body } }, { new: true, runValidators: true })
      res.send(blog)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const blog = await dbContext.Blogs.findOneAndUpdate(
        {
          _id: req.params.blogId,
          comments: {
            creatorId: req.userInfo.id
          }
        },
        { $pull: { comments: req.params.commentId } },
        { new: true, runValidators: true }
      )
      res.send(blog)
    } catch (error) {
      next(error)
    }
  }
}
