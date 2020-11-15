<template>
<div class="console">
  <History :prompt="prompt" />
  <Prompt :prompt="prompt" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import History from './History.vue'
import Prompt from './Prompt.vue'

export default defineComponent({
  name: 'Console' as string,
  props: {
    prompt: String
  },
  components: {
      History,
      Prompt
  }
})
</script>