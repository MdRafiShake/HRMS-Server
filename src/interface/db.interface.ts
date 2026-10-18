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

    // Read Department Data
    readDepartmentList: boolean

    readDepartment: boolean
    createDepartment: boolean
    updateDepartment: boolean
    deleteDepartment: boolean

    //add more permissions here also update the model
  }
  createdAt?: Date
  createdBy?: Types.ObjectId

  updatedAt?: Date
  updatedBy?: Types.ObjectId

  isDeleted?: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId
}
