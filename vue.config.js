module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: true,
    proxy: {
      "/": {
        target: "https://api.meetadoo.com/dev"
      }
    }
  }
};
