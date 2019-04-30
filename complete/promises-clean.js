import { 
    readSession,
    validateSession,
    login,
    getProjects
} from '../lib/utils-promises';

readSession()
    .then(validateReadSession, handleReadError)
    .then(loginIfNecessary, handleValidateError)
    .then(getUserProjects, handleLoginError)
    .then(displayProjects, handleProjectsError)
    .catch(handleErrors);

function validateReadSession(session) {
    if( session ) {
        console.log('session found: ', session);
        return validateSession(session);
    }
    else {
        console.log('session not found');
        return false;
    }
}

function loginIfNecessary({ valid, session }) {
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
}

function getUserProjects(session) {
    console.log('session ready: ', session);
    return getProjects(session);
}

function displayProjects(projects) {
    console.log('obtained user\'s projects: ', projects);
}

function handleReadError(err) {
    return Promise.reject({
        message: 'failed to read session',
        reason: err
    });
}

function handleValidateError(err) {
    return Promise.reject({
        message: 'failed to validate session',
        reason: err
    });
}

function handleLoginError(err) {
    return Promise.reject({
        message: 'failed to login',
        reason: err
    });
}

function handleProjectsError(err) {
    return Promise.reject({
        message: 'failed to get projects',
        reason: err
    });
}

function handleErrors(err) {
    console.error('failed task: ', err);
}