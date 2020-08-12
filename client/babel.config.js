module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        targets: "> 1%, not dead",
        modules: false,
        corejs: "3",
      },
    ],
  ];

  const plugins = [
    [
      "transform-class-properties",
      {
        spec: true,
      },
    ],
  ];

  const env = {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: "auto",
          },
          "jest",
        ],
      ],
    },
  };

  return {
    presets,
    env,
  };
};
