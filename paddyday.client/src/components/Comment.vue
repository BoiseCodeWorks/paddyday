<template>
  <div>
    <button @click="state.editComment = !state.editComment">
      Edit
    </button>
    <div v-if="state.editComment">
      <CommentForm :comment="comment" :blog="blog" />
    </div>
    <div v-else>
      <div class="comment-content">
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  props: {
    comment: { type: Object, required: true },
    blog: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      editComment: false
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
