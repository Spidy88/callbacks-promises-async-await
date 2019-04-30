import { 
    readSession,
    validateSession,
    login,
    getProjects
} from '../lib/utils-callbacks';

readSession(handleReadSession);

function handleReadSession(err, session) {
    if( err ) {
        console.error('failed to read session: ', err);
        return;
    }

    if( !session ) {
        console.log('user session not found');
        
        let credentials = {
            username: 'Nick',
            password: 'password'
        };

        login(credentials, handleLogin);
    }
    else {
        console.log('user session found: ', session);

        validateSession(session, handleValidateSession);
    }
}

function handleValidateSession(err, valid, session) {
    if( err ) {
        console.error('failed to validate session: ', err);
        return;
    }

    if( !valid ) {
        console.log('session is not valid');
        let credentials = {
            username: 'Nick',
            password: 'password'
        };

        login(credentials, handleLogin);
    }
    else {
        console.log('session valid');
        getProjects(session, handleGetProjects);
    }
}

function handleLogin(err, session) {
    if( err ) {
        console.error('failed to login: ', err);
        return;
    }

    console.log('successfully logged in');
    getProjects(session, handleGetProjects);
}

function handleGetProjects(err, projects) {
    if( err ) {
        console.error('failed to get user\'s projects');
        return;
    }
    
    console.log('obtained user\'s projects: ', projects);
}