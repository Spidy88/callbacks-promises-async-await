import { 
    readSession,
    validateSession,
    login,
    getProjects
} from '../lib/utils-promises';

readSession()
    .then(
        (session) => {
            if( session ) {
                console.log('session found: ', session);
                return validateSession(session);
            }
            else {
                console.log('session not found');
                return false;
            }
        },
        (err) => {
            return Promise.reject({
                message: 'failed to read session',
                reason: err
            });
        }
    )
    .then(({ valid, session }) => {
        if( valid ) {
            console.log('session valid: ', session);
            return session;
        }
        else {
            console.log('session invalid');

            let credentials = {
                username: 'Nick',
                password: 'password'
            };

            return login(credentials);
        }
    })
    .then((session) => {
        console.log('session ready: ', session);
        return getProjects(session);
    })
    .then((projects) => {
        console.log('obtained user\'s projects: ', projects);
    })
    .catch((err) => {
        console.error('failed task: ', err);
    });