const proxy = {
    '/api/': {
        target: 'http://198.168.111.111:3001',
        changeOrigin: true,
    },
};

export default proxy;
