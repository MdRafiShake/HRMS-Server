import { Router } from 'express'
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  getRoleByIdController,
  restoreRoleController,
  updateRoleController
} from '../controllers/role.controller.js'
import verifyUser from '../middlewares/verifyUser.middleware.js'
import verifyPermissions from '../middlewares/verifyPermissions.middleware.js'

const router: Router = Router()

router.get('/', verifyUser, verifyPermissions(['readRoleList']), getAllRoleController)
router.get('/:id', verifyUser, verifyPermissions(['readRole']), getRoleByIdController)

router.post('/', verifyUser, verifyPermissions(['createRole']), createRoleController)
router.put('/:id', verifyUser, verifyPermissions(['updateRole']), updateRoleController)
router.delete('/:id', verifyUser, verifyPermissions(['deleteRole']), deleteRoleController)
router.patch('/:id', verifyUser, verifyPermissions(['restoreRole']), restoreRoleController)

export default router
