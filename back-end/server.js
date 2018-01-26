
'use strict'

const Hapi = require('hapi')

const Monk = require('monk')

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
    path:'/planes', 
    handler: (request, h) => {
        return {planes: [
            {
                name: "F35",
                class: "fighter"
            },
            {
                name: "A10",
                class: "cargo"
            },
            {
                name: "Helicopter",
                class: "transportation"
            }
        ]}
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
    handler: async (request, h) => {
        const cars = await getCarsCollection()
        const carObjects = await cars.find()
        return { cars: carObjects ? carObjects : [] }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

const getCarsCollection = async () => {
    const connectionString ='mongodb://Application:R0bin112@ds111568.mlab.com:11568/dealership'
    const db = Monk(connectionString)
    const cars = await  db.get("cars")
    return cars
}

server.route({
    method: 'POST',
    path: '/cars',
    handler: async (request, h) => {
        const cars = await getCarsCollection()
        cars.insert(request.payload)
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