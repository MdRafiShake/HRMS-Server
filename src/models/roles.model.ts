import mongoose, { Schema } from 'mongoose'
import type { RoleInterface } from '../interface/db.interface'

const roleSchema = new Schema<RoleInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    permissions: {
      readEmployeeList: { type: Boolean, default: false },
      readEmployee: { type: Boolean, default: false },
      createEmployee: { type: Boolean, default: false },
      updateEmployee: { type: Boolean, default: false },
      deleteEmployee: { type: Boolean, default: false },

      readRoleList: { type: Boolean, default: false },
      readRole: { type: Boolean, default: false },
      createRole: { type: Boolean, default: false },
      updateRole: { type: Boolean, default: false },
      deleteRole: { type: Boolean, default: false },

      readDepartmentList: { type: Boolean, default: false },
      readDepartment: { type: Boolean, default: false },
      createDepartment: { type: Boolean, default: false },
      updateDepartment: { type: Boolean, default: false },
      deleteDepartment: { type: Boolean, default: false }
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true
  }
)

// --- SOFT DELETE MIDDLEWARE ---
roleSchema.pre(
  /^find/,
  function (this: mongoose.Query<any, RoleInterface>, next) {
    const options = this.getOptions();
    if (!options.includeDeleted) {
      this.where({ isDeleted: false });
    }
    next();
  }
);

const Role = mongoose.model<RoleInterface>('Role', roleSchema)
export default Role
