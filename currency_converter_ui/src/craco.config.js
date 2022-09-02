const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#5da980',
              '@border-color-base': '#C5C5C5',
              '@component-background': '#FEFCFC',
              '@input-border-color': '#000000',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
