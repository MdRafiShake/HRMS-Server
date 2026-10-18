import { Router } from 'express'
import { createRole } from '../controllers/role.controller.js' // 👈 Add .js here

const router: Router = Router()

router.post('/', createRole)

export default router
