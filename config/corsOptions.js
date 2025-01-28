const whitelist = [
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3000',
    'http://192.168.139.116:3000'
];

const corsOptions = {
    origin: (origin, callback) => {
        console.log('CORS OPtions: ', origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
            console.log('CORS Error!')
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;