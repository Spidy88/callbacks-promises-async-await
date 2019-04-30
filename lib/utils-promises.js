const DELAY = 1500;

export function readSession() {
    console.log('reading session');
    return call({ id: 1, username: 'Spidy' });
}

export function validateSession(session) {
    console.log('validating session: ', session);
    return call({ valid: false, session });
}

export function login(credentials) {
    console.log('logging in: ', credentials);
    return call({ 
        id: 1, 
        username: credentials.username
    });
}

export function getProjects(session) {
    console.log('getting projects: ', session);
    return call({ 
        results: [
            { name: 'Callbacks' }, 
            { name: 'Promises' }, 
            { name: 'Async Await' }
        ] 
    });
}

function call(value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), DELAY);
    });
}

function callWithError(err) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(err), DELAY);
    });
}