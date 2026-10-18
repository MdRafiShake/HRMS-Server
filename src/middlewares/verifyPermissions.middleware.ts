import type { NextFunction, Request, Response } from 'express'
import type { PermissionKey } from '../interface/db.interface'

const verifyPermissions = (requiredPermissions: PermissionKey[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = req?.permissions || {}
    const hasPermission = requiredPermissions.every(permission => userPermissions[permission])
    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }
    next()
  }
}

export default verifyPermissions