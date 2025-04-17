import mockUsers from "../mocks/users.mock.mjs";


const loginUser = ( req = Request, res = Response ) => {
    const { body: { username, password } } = req;

    // TODO: Validate body using express-validator


    const findUser = mockUsers.find( user => user.username === username );
    if( ! findUser || findUser.password !== password )
        return res.status( 401 ).send({ msg: 'Bad Credentials' });

    req.session.user = findUser;     // Modificamos el estado de la sesión agregando un dato personalizado

    return res.status( 200 ).send( findUser );
}

const statusUser = ( req = Request, res = Response ) => {
    /** Muestra el último estado de los datos guardado en la sesion */
    req.sessionStore.get( req.session.id, ( err, sessionData ) => {
        if ( err ) {
            console.error( err );
            throw err;
        }

        console.log( 'sessionStore (data): ', sessionData );                            // Muestra los datos almacenados en el store (Sin procesar por Express)
    } );

    return req.session.user
                ?   res.status( 200 ).send( req.session.user )
                :   res.status( 401 ).send({ msg: 'Not Authenticated' });
}


export default {
    loginUser,
    statusUser
}