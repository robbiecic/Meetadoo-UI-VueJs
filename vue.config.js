module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: true,
    proxy: {
      "/": {
        target: "https://i6vtmh1eq3.execute-api.ap-southeast-2.amazonaws.com"
      }
    }
  }
};
