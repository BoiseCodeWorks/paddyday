<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input class="form-control" placeholder="title" type="text" v-model="state.editable.title">
    </div>
    <div>
      <textarea class="form-control" placeholder="description" type="text" v-model="state.editable.description"></textarea>
    </div>

    <div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
      <button type="reset" class="btn text-muted mx-5">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, watchEffect } from 'vue'
import { Blog } from '../models/Blog'
import { blogService } from '../services/BlogService'

export default {
  props: {
    blog: { type: Object, default: () => new Blog() }
  },
  setup(props) {
    const state = reactive({
      editable: new Blog()
    })

    watchEffect(() => {
      state.editable = props.blog
    })

    return {
      state,
      async handleSubmit() {
        if (state.editable.id) {
          blogService.editBlog(state.editable)
        } else {
          blogService.createBlog(state.editable)
        }
      }
    }
  }
}
</script>

<style>

</style>
