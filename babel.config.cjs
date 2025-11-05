module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        },
        // Keep modules as 'auto' (babel-jest will transform ESM)
        modules: "auto"
      }
    ]
  ]
};
