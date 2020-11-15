module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import "@/styles/_variables.scss";
        `
      }
    }
  }
}
