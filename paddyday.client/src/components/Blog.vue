<template>
  <div>
    <button @click="state.editBlog = !state.editBlog">
      Edit
    </button>
    <div v-if="state.editBlog">
      <BlogForm :blog="blog" />
    </div>
    <div v-else>
      <div class="blog-title">
        {{ blog.title }}
      </div>
      <div class="blog-content">
        {{ blog.description }}
      </div>
      <div class="blog-author">
        <span class="text-uppercase">
          {{ blog.author.name }}
        </span>
      </div>
      <button @click="state.showAddComment = !state.showAddComment">
        Add Comment
      </button>
      <div v-if="state.showAddComment">
        <CommentForm :blog="blog" />
      </div>
      <div class="comments">
        <Comment v-for="comment in blog.comments" :key="comment.id" :comment="comment" :blog="blog" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  props: {
    blog: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      editBlog: false
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
