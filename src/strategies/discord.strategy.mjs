import passport from 'passport';
import { Strategy } from 'passport-discord';
import { DiscordUserModel } from '../mongoose/discord-user.schema.mjs';

/** Configure Discord Strategy */
export default passport.use(
    new Strategy({
        clientID: "1364347219783843942",
        clientSecret: "89GuQfbz5n8KpfV5cbdekNlEonZ5EPHM",
        callbackURL: "http://localhost:3000/api/auth/discord/redirect",
        scope: [ "identify" ]   // [ "identify", "email", "guilds" ]
    }, 
    async ( accessToken, refreshToken, profile, done ) => {
        console.log({ profile });       // Obtiene datos del usuario en Discord

        let findUser;

        /** Consultamos si el usuario esta registrado */
        try {
            findUser = await DiscordUserModel.findOne({ discordId: profile.id });
        } 
        catch ( error ) {
            return done( error, null );
        }

        try {
            /** Si el usuario NO existe */        
            if( ! findUser ) {
                /** Registramos el usuario */
                const newUser = new DiscordUserModel({
                    username: profile.username,
                    discordId: profile.id
                });
    
                const newSavedUser = await newUser.save();
    
                return done( null, newSavedUser );
            }

            /** Si existe lo retornamos */
            return done( null, findUser );
        } 
        catch ( error ) {
            console.error( error );
            return done( error, null );
        }

        

    })
)

/**
 * Configuración de serialización del usuario
 * Determina qué datos del usuario se almacenan en la sesión
 */
passport.serializeUser( ( user, done ) => {
    console.error( 'serializeUser: ', user );
    done( null, user._id );                      // Solo almacenamos el ID en la sesión (Debe pasarse un valor unico que identifique al usuario)
});

/**
 * Configuración de deserialización del usuario
 * Recupera los datos completos del usuario a partir del ID almacenado
 */
passport.deserializeUser( async ( id, done ) => {
    console.error( 'deserializeUser: ', id );
    try {
        // Busca el usuario en la base de datos
        const findUser = await DiscordUserModel.findById( id );
        
        return findUser 
            ?   done( null, findUser )
            :   done( null, null );    
    } 
    catch (error) {
        done( error, null );
    }
    
});