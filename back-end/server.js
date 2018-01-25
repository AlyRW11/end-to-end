
'use strict'

const Hapi = require('hapi')

const server = Hapi.server({ 
    host: 'localhost', 
    port: 3001
});

server.route({
    method: 'GET',
    path:'/', 
    handler: (request, h) => {
        return {message:'hello world'}
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'GET',
    path:'/cars', 
    handler: (request, h) => {
        return {cars: [{
            make: "Jeep",
            model: "Wrangler",
            year: 2011,
            mileage: 92352
        },{
            make: "Nissan",
            model: "Altima",
            year: 2017,
            mileage: 5000
        }] 
        }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'POST',
    path: '/cars',
    handler: (request, h) => {
        console.log(request.payload)
        return h.response('success')
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start()