import { 
    readSession,
    validateSession,
    login,
    getProjects
} from '../lib/utils-promises';

(async () => {
    try {
        let session = await readSession();
        let valid = false;

        if( session ) {
            console.log('session found: ', session);
            valid = (await validateSession(session)).valid;
        }

        console.log(valid ? 'session valid' : 'session is not valid');
        if( !valid ) {
            let credentials = {
                username: 'Nick',
                password: 'password'
            };
            
            session = await login(credentials);
        }

        let projects = await getProjects(session);
        console.log('obtained user\'s projects: ', projects);
    }
    catch(err) {
        console.error('task failed: ', err);
    }
})();