<template>
  <Console :prompt="prompt" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Console from './components/Console.vue'

export default defineComponent({
  name: 'App' as string,
  data () {
    return {
      prompt: '[guest@baraniewski.com] $' as string
    }
  },
  components: {
    Console
  }
})
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
