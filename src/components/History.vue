<template>
<div class="console">
  <WelcomeMessage />
  <div v-for="execution in history" :key="execution">
    <LogLine :execution="execution" :key="execution" :prompt="prompt" />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Execution } from '@/types'
import LogLine from './LogLine.vue'
import WelcomeMessage from './WelcomeMessage.vue'

interface History {
  history: Array<Execution>;
}

export default defineComponent({
  name: 'History' as string,
  computed: {
    history: {
      get (): Array<Execution> {
        return this.$store.state.history
      },
      set (value: Array<Execution>): void {
        console.log(value)
      }
    }
  },
  components: {
    LogLine,
    WelcomeMessage
  },
  props: {
    prompt: String
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.console {
  width: 100%;
  bottom: 0;
  margin-bottom: 5px;
  overflow: auto;
}

</style>
