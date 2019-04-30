const DELAY = 1500;

export function readSession(cb) {
    console.log('reading session');
    call(cb, { id: 1, username: 'Spidy' });
}

export function validateSession(session, cb) {
    console.log('validating session: ', session);
    call(cb, false, session);
}

export function login(credentials, cb) {
    console.log('logging in: ', credentials);
    call(cb, { 
        id: 1, 
        username: credentials.username
    });
}

export function getProjects(session, cb) {
    console.log('getting projects: ', session);
    call(cb, { 
        results: [
            { name: 'Callbacks' }, 
            { name: 'Promises' }, 
            { name: 'Async Await' }
        ] 
    });
}

function call(cb, ...params) {
    setTimeout(() => cb(null, ...params), DELAY);
}

function callWithError(cb, err, ...params) {
    setTimeout(() => cb(err, ...params), DELAY);
}