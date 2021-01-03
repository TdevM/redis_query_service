import * as handlers from './handlers';

let routes = [
    {
        method: 'GET',
        path: '/evaluate',
        handler: handlers.evaluate
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: handlers.get
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: handlers.put
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: handlers.del
    }
];

export default routes;
