import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

import { createUserValidationSchema } from '../utils/create-user-validation.schema.mjs';
import { filterUsersSchema } from '../utils/filter-users-validation.schema.mjs';
import { resolveIndexByUserId } from '../middlewares/resolve-index-by-user-id.middleware.mjs';
import { loggingMiddlware } from '../middlewares/logging.middleware.mjs';

import mockUsers from '../mocks/users.mock.mjs';
import userController from '../controllers/user.controller.mjs';

const router = Router();

/** Define rutas para usuario */
router.get( '/api/users', filterUsersSchema, userController.getUsers );

router.use( loggingMiddlware );            // Todas las rutas de aqui en adelante harán uso del loggingMiddleware

router.post( '/api/users', createUserValidationSchema,  userController.createUser );
router.patch( '/api/users/:id', resolveIndexByUserId, userController.partialUpdateUserById );
router.get( '/api/users/:id', resolveIndexByUserId, userController.getUserById );
router.put( '/api/users/:id', resolveIndexByUserId, userController.totalUserUpdateById );
router.delete( '/api/users/:id', resolveIndexByUserId, userController.deleteUserById );


export default router;