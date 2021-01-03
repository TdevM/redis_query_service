import * as handlers from './handlers';

let routes = [
    {
        method: 'POST',
        path: '/evaluate',
        handler: handlers.evaluate
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: handlers.get
    },
    {
        method: 'POST',
        path: '/users',
        handler: handlers.post
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        handler: handlers.patch
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: handlers.del
    }
];

export default routes;
