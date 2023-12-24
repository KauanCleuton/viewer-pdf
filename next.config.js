module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif|pdf|node)$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      });
  
      return config;
    },
  };
  