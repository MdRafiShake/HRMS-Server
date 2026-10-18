import type { Types } from 'mongoose'

export interface RoleInterface {
  name: String
  description: String
  permissions: {
    // Read Employee Data
    readEmployeeList: Boolean

    readEmployee: Boolean
    createEmployee: Boolean
    updateEmployee: Boolean
    deleteEmployee: Boolean

    // Read Role Data
    readRoleList: Boolean

    readRole: Boolean
    createRole: Boolean
    updateRole: Boolean
    deleteRole: Boolean

    // Read Department Data
    readDepartmentList: Boolean

    readDepartment: Boolean
    createDepartment: Boolean
    updateDepartment: Boolean
    deleteDepartment: Boolean

    //add more permissions here also update the model

  }
}