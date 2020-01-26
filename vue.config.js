module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/CreateUser": {
        target:
          "https://i6vtmh1eq3.execute-api.ap-southeast-2.amazonaws.com/Development"
      }
    }
  }
};
