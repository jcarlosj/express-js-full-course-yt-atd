import passport from 'passport';
import { Strategy } from 'passport-local';
import mockUsers from '../mocks/users.mock.mjs';

/** Configure Strategy */
export default passport.use(
    new Strategy( 
        { usernameField: "email" },             // Especifica que usaremos el campo 'email' como username
        ( username, password, done ) => {
            console.log( 'Credentials: ', { username ,password } );

            try {
                // Busca el usuario en la "base de datos" mock
                const findUser = mockUsers.find( user => user.username === username );
                
                // Usuario no encontrado
                if( ! findUser )
                    throw new Error( 'User not found' );

                // Contraseña incorrecta
                if( findUser.password !== password )
                    throw new Error( 'Invalid credentials' );

                // Autenticación exitosa
                return done( null, findUser );
            } 
            catch ( error ) {        
                // Error en el proceso de autenticación                                        
                return done( error, null ); 
            }
        })
);
