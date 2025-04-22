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