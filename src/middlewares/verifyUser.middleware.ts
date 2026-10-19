import type { NextFunction, Request, Response } from 'express'

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement user verification logic here

  req.userId = '6ad4729e856ea46aefdb1ff3' // Placeholder for user verification logic

  req.username = 'admin' // Placeholder for user verification logic

  req.permissions = {
    readEmployeeList: true,
    createEmployee: false,
    readRoleList: true,
    createRole: true,
    updateRole: true,
    deleteRole: true,
    restoreRole: true,
    readRole: true,
    readDepartmentList: false,
    createDepartment: false,

    readAssetList: true,
    createAsset: true,
    readAsset: true,
    updateAsset: true,
    restoreAsset: true,
    deleteAsset: true
  }

  next()
}

export default verifyUser
