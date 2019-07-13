const path = require('path');

module.exports = {
  webpack: {
    output: {
      publicPath: './', // 以保证资源路径正确。
    },  
    resolve: {    
      alias: {
        Axios: path.resolve(__dirname, './src/components/axios.js'),
      },
    },
    devServer: {
      open: true,
      port: 3030,
    },
  },
  // envs: {
  //   API: 'http://localhost',
  //   TEST: 'ss',
  // },  
};
