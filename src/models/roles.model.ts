import mongoose, { Schema } from "mongoose";
import type { RoleInterface } from "../interface/db.interface";

const roleSchema =new Schema<RoleInterface>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ""
  },
  permissions: {
    // Read Employee Data
    readEmployeeList: { type: Boolean, default: false },
    readEmployee: { type: Boolean, default: false },
    createEmployee: { type: Boolean, default: false },
    updateEmployee: { type: Boolean, default: false },
    deleteEmployee: { type: Boolean, default: false },

    // Read Role Data
    readRoleList: { type: Boolean, default: false },
    readRole: { type: Boolean, default: false },
    createRole: { type: Boolean, default: false },
    updateRole: { type: Boolean, default: false },
    deleteRole: { type: Boolean, default: false },

    // Read Department Data
    readDepartmentList: { type: Boolean, default: false },
    readDepartment: { type: Boolean, default: false },
    createDepartment: { type: Boolean, default: false },
    updateDepartment: { type: Boolean, default: false },
    deleteDepartment: { type: Boolean, default: false }

    //add more permissions here also update the interface 
  }
});

const Role = mongoose.model<RoleInterface>("Role", roleSchema);
export default Role;    