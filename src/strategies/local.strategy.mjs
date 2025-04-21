import passport from 'passport';
import { Strategy } from 'passport-local';
import mockUsers from '../mocks/users.mock.mjs';

/** Configure Strategy */
export default passport.use(
    new Strategy( 
        // { usernameField: "email" },             // Especifica que usaremos el campo 'email' como username
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


/**
 * Configuración de serialización del usuario
 * Determina qué datos del usuario se almacenan en la sesión
 */
passport.serializeUser( ( user, done ) => {
    console.error( 'serializeUser: ', user );
    done( null, user.id );                      // Solo almacenamos el ID en la sesión (Debe pasarse un valor unico que identifique al usuario)
});

/**
 * Configuración de deserialización del usuario
 * Recupera los datos completos del usuario a partir del ID almacenado
 */
passport.deserializeUser( ( id, done ) => {
    console.error( 'deserializeUser: ', id );
    try {
        const findUser = mockUsers.find( user => user.id === id );
        if( ! findUser ) {
            console.error( 'deserializeUser: ', 'User not Found' );
            throw new Error( 'User not Found' );
        }
            
        done( null, findUser );    
    } 
    catch (error) {
        done( error, null );
    }
    
});