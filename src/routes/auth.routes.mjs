import { Router } from 'express';
import authController from '../controllers/auth.controller.mjs';
// import { loginUserValidationSchema } from '../utils/login-user-validation.schema.mjs';
import passport from 'passport';

const router = Router();

/** Define rutas principales */
// router.post( '/api/auth', loginUserValidationSchema , authController.loginUser );

/** passport.authenticate('local') middleware:
 * 1. Recibe las credenciales (email y password)
 * 2. Ejecuta la estrategia local configurada
 * 3. En éxito: crea sesión y establece req.user
 * 4. En fallo: redirige o devuelve error
 */
router.post( 
    '/api/auth', 
    passport.authenticate( 'local' ), 
    ( req = Request, res = Response ) => {
        // Si la autenticación fue exitosa, req.user contendrá el usuario

        /** Muestra el último estado de los datos guardado en la sesion */
        req.sessionStore.get( req.session.id, ( err, sessionData ) => {
            if ( err ) {
                console.error( err );
                throw err;
            }

            console.log( 'sessionStore (user): ', sessionData );                            // Muestra los datos almacenados en el store (Sin procesar por Express)
        } );

        res.sendStatus( 200 );
        // res.json({ 
        //     message: 'Autenticación exitosa',
        //     user: req.user 
        // });
    } 
);

router.get( 
    '/api/auth/discord', 
    passport.authenticate( 'discord' )
);
router.get( 
    '/api/auth/discord/redirect', 
    passport.authenticate( 'discord' ),
    ( req = Request, res = Response ) => {
        res.sendStatus( 200 );
    }
);

router.get( '/api/auth/status', authController.statusUser );

router.post( '/api/auth/logout', authController.logoutUser );

export default router;