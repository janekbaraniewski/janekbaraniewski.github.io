<template>
<div class="welcome-message">
    <pre>{{ message }}</pre>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'WelcomeMessage' as string,
  data () {
    return {
      message: '' as string,
      messageBuffer: `

 _                   _               _   _
| |_ ___ ___ ___ ___|_|___ _ _ _ ___| |_|_|  ___ ___ _____
| . | .'|  _| .'|   | | -_| | | |_ -| '_| |_|  _| . |     |
|___|__,|_| |__,|_|_|_|___|_____|___|_,_|_|_|___|___|_|_|_|


Welcome to baraniewski.com

` as string
    }
  },
  methods: {
    ...mapActions([
      'scrollToConsoleBottom'
    ]),
    rewriteMessage () {
      this.message += this.messageBuffer[0]
      this.messageBuffer = this.messageBuffer.slice(1)
      if (this.messageBuffer.length > 0) {
        setTimeout(this.rewriteMessage, 0)
      }
    }
  },
  mounted () {
    this.rewriteMessage()
  },
  updated () {
    this.scrollToConsoleBottom()
  }
})
</script>

<style lang="scss" scoped>
.welcome-message {
    margin-top: 100%;
}
</style>
