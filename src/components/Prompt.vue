<template>
<div class="prompt">
<form v-on:submit.prevent="runCommand">
  <div class="input-group">
    <span clas="input-group-addon">{{ prompt }}</span>
    <input v-model="currentCommand" type="text" name="input" ref="prompt" autocomplete="off" />
  </div>
</form>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

interface Prompt {
    currentCommand: string;
}

export default defineComponent({
  name: 'Prompt' as string,
  computed: {
    currentCommand: {
      get (): string {
        return this.$store.state.currentCommand
      },
      set (value: string): void {
        this.$store.commit('setCommand', value)
      }
    }
  },
  props: {
    prompt: String
  },
  methods: {
    runCommand (): void {
      const result = this.handleCommand(this.currentCommand)
      this.currentCommand = ''
    },
    ...mapActions([
      'handleCommand'
    ])
  },
  mounted () {
    setInterval(() => {
      (this.$refs.prompt as HTMLInputElement).focus()
    }, 100)
  }
})
</script>

<style lang="scss" scoped>
  .prompt {
    float: left;
    width: 100%;
    height: 30px;
    left: 0;
    background-color: $backgroundColor;
  }
  .prompt div {
    float: left;
  }
  .prompt input {
    color: $inputText;
    background-color: $backgroundColor;
    border: 0;
  }

  .prompt input:focus {
    outline: none;
  }
</style>
