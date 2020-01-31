module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target:
          "https://i6vtmh1eq3.execute-api.ap-southeast-2.amazonaws.com/Development/",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        secure: false
      }
    }
  }
};
