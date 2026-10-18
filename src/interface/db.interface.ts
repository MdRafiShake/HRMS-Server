import type { Types } from 'mongoose'

export interface RoleInterface {
  name: string
  description: string
  status: 'active' | 'inactive'
  permissions: {
    // Read Employee Data
    readEmployeeList: boolean
    readEmployee: boolean
    createEmployee: boolean
    updateEmployee: boolean
    deleteEmployee: boolean

    // Read Role Data
    readRoleList: boolean
    readRole: boolean
    createRole: boolean
    updateRole: boolean
    deleteRole: boolean
    restoreRole: boolean

    // Read Department Data
    readDepartmentList: boolean
    readDepartment: boolean
    createDepartment: boolean
    updateDepartment: boolean
    deleteDepartment: boolean

    // Read Assets Data
    readAssetList: boolean
    assignAsset: boolean
    createAsset: boolean
    readAsset: boolean
    updateAsset: boolean
    deleteAsset: boolean
  }
  createdAt?: Date
  createdBy?: Types.ObjectId
  updatedAt?: Date
  updatedBy?: Types.ObjectId
  isDeleted?: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId
}

// Extract all permission keys dynamically as a type union
export type PermissionKey = keyof RoleInterface['permissions']