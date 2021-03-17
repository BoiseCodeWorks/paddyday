import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comment = new Schema({
  body: { type: String, required: true },
  creatorId: { type: String, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export const Blog = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    comments: [Comment]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('author', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Blog.virtual('author', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
