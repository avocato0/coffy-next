module.exports = {
	webpack: (config, options) => {
		config.externals = [
			...(config.externals || []),
			'child_process',
			'dns',
			'fs',
			'net',
			'tls',
		]
		return config
	},
}
