<template>
    <div class="row logline">
        <div class="prompt">
          <span> {{ prompt }}{{ execution.command.command }} {{ execution.command.args.join(' ') }} </span>
        </div>
        <div class="result">
          <pre :innerHTML="output"></pre>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'LogLine' as string,
  data () {
    return {
      output: '' as string,
      outputBuffer: '' as string
    }
  },
  props: {
    prompt: String,
    execution: null
  },
  methods: {
    ...mapActions([
      'scrollToConsoleBottom'
    ]),
    rewriteLetter () {
      this.output += this.outputBuffer[0]
      this.outputBuffer = this.outputBuffer.slice(1)
      if (this.outputBuffer.length > 0) {
        setTimeout(this.rewriteLetter, 5)
      }
    }
  },
  mounted () {
    this.outputBuffer = this.execution.result
    this.rewriteLetter()
  },
  updated () {
    this.scrollToConsoleBottom()
  }
})
</script>

<style lang="scss" scoped>
    .result pre {
      width: 100%;
      text-align: left;
      margin: 0;
      margin-top: 7px;
    }
    .result {
      margin-bottom: 7px;
    }
    .logline {
      width: 100%;
    }
    .logline * {
      width: 100%;
      float: left;
    }
    .prompt {
      height: 100%;
    }
</style>
