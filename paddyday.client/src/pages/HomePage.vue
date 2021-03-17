<template>
  <div class="home">
    <button @click="state.showCreateBlog = !state.showCreateBlog">
      Create Blog
    </button>
    <div v-if="state.showCreateBlog">
      <BlogForm />
    </div>

    <div class="blog-cards">
      <Blog class="my-3 card p-3" v-for="blog in state.blogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      showCreateBlog: false
    })
    onMounted(blogService.getBlogs)
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">

</style>
