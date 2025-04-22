import passport from 'passport';
import { Strategy } from 'passport-discord';

/** Configure Discord Strategy */
export default passport.use(
    new Strategy({
        clientID: "1364347219783843942",
        clientSecret: "89GuQfbz5n8KpfV5cbdekNlEonZ5EPHM",
        callbackURL: "http://localhost:3000/api/auth/discord/redirect",
        scope: [ "identify" ]   // [ "identify", "email", "guilds" ]
    }, 
    ( accessToken, refreshToken, profile, done ) => {
        console.log({ profile });
    })
)