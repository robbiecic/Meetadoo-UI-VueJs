module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/": {
        target: "https://i6vtmh1eq3.execute-api.ap-southeast-2.amazonaws.com",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
