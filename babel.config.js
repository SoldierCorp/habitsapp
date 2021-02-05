module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
      [
        'module-resolver',
        {
					alias: {
						assets: './src/assets',
						styles: './src/assets/styles',
						components: './src/components',
						containers: './src/containers',
						services: './src/services'
					}
				}
			]
		]
};
