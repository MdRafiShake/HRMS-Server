import { Router } from 'express'
import {
  createAssetController,
  deleteAssetController,
  getAllAssetController,
  getAssetController,
  getAssetRecycleBinController,
  restoreAssetController,
  updateAssetController
} from '../controllers/asset.controller'
import verifyUser from '../middlewares/verifyUser.middleware'
import verifyPermissions from '../middlewares/verifyPermissions.middleware'

const router: Router = Router()

// --- PUBLIC / LIST ROUTES ---
router.get(
  '/',
  verifyUser,
  verifyPermissions(['readAssetList']),
  getAllAssetController
)

router.get(
  '/recycle_bin',
  verifyUser,
  verifyPermissions(['readAsset']),
  getAssetRecycleBinController
)

// --- SINGLE ASSET ROUTES ---
router.get(
  '/:id',
  verifyUser,
  verifyPermissions(['readAsset']),
  getAssetController
)

router.post(
  '/',
  verifyUser,
  verifyPermissions(['createAsset']),
  createAssetController
)

router.put(
  '/:id',
  verifyUser,
  verifyPermissions(['updateAsset']),
  updateAssetController
)

router.delete(
  '/:id',
  verifyUser,
  verifyPermissions(['deleteAsset']),
  deleteAssetController
)

router.patch(
  '/:id/restore',
  verifyUser,
  verifyPermissions(['restoreAsset']),
  restoreAssetController
)

export default router