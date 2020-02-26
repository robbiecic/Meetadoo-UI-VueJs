module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: true,
    proxy: {
      "/": {
        target: "https://www.meetadoo.com/api/"
      }
    }
  }
};
