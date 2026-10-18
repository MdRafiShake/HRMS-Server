import { Router } from 'express'
import {
  createRole,
  deleteRole,
  getAllRole,
  getRoleById,
  updateRole
} from '../controllers/role.controller.js'
import verifyUser from '../middlewares/verifyUser.middleware.js'

const router: Router = Router()

router.get('/', verifyUser, getAllRole)
router.get('/:id', verifyUser, getRoleById)

router.post('/', verifyUser, createRole)
router.put('/:id', verifyUser, updateRole)
router.delete('/:id', verifyUser, deleteRole)

export default router
