<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <textarea class="form-control" placeholder="description" type="text" v-model="state.editable.body"></textarea>
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
import { blogService } from '../services/BlogService'

export default {
  props: {
    comment: { type: Object, default: () => { return { description: '', author: {} } } },
    blog: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      editable: { description: '', author: {} }
    })

    watchEffect(() => {
      state.editable = props.comment
    })

    return {
      state,
      async handleSubmit() {
        blogService.addComment(props.blog.id, state.editable)
      },
      async removeComment() {
        blogService.removeComment(state.editable)
      }
    }
  }
}
</script>

<style>

</style>
