module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/led-test/'
        : '/',
    css: {
        requireModuleExtension: true
    }
}