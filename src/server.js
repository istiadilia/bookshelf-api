import Hapi from '@hapi/hapi';
import routes from './routes';

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost', 
        // konfigurasi CORS
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // route configuration
    server.route(routes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();