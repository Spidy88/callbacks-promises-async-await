import { 
    readSession,
    validateSession,
    login,
    getProjects
} from '../lib/utils-callbacks';

readSession((err, session) => {
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

        login(credentials, (err, session) => {
            if( err ) {
                console.error('failed to login: ', err);
                return;
            }

            getProjects(session, (err, projects) => {
                if( err ) {
                    console.error('failed to get user\'s projects');
                    return;
                }

                console.log('obtained user\'s projects: ', projects);
            });
        });
    }
    else {
        console.log('user session found: ', session);

        validateSession(session, (err, valid) => {
            if( !valid ) {
                let credentials = {
                    username: 'Nick',
                    password: 'password'
                };
        
                login(credentials, (err, session) => {
                    if( err ) {
                        console.error('failed to login: ', err);
                        return;
                    }

                    getProjects(session, (err, projects) => {
                        if( err ) {
                            console.error('failed to get user\'s projects');
                            return;
                        }
                        
                        console.log('obtained user\'s projects: ', projects);
                    });
                });
            }
            else {
                getProjects(session, (err, projects) => {
                    if( err ) {
                        console.error('failed to get user\'s projects');
                        return;
                    }
                    
                    console.log('obtained user\'s projects: ', projects);
                });
            }
        });
    }
});