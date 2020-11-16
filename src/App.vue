<template>
  <Console :prompt="prompt" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KeyEvent } from '@/types'
import Console from './components/Console.vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'App' as string,
  data () {
    return {
      prompt: '[guest@baraniewski.com]$ ' as string
    }
  },
  methods: {
    ...mapActions([
      'historyPast',
      'historyFuture'
    ]),
    handleKey (e: KeyEvent): void {
      switch (e.keyCode) {
        case 38:
          this.historyPast()
          break
        case 40:
          this.historyFuture()
          break
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.handleKey)
  },
  components: {
    Console
  }
})
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
