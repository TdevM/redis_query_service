import * as handlers from './handlers';

let routes = [
    {
        method: 'GET',
        path: '/hello',
        handler: handlers.hello
    },
    {
        method: 'GET',
        path: '/server',
        handler: (request, h) => {
            return request
        }
    }
];

export default routes;
