// src/models/role.model.ts
import mongoose, { Schema } from 'mongoose'
import { PERMISSIONS_LIST, type PermissionKey } from '../constants/permissions.constant'
import type { RoleInterface } from '../interface/db.interface'

// Programmatically build the Mongoose permissions sub-object
const permissionsSchemaDefinition = PERMISSIONS_LIST.reduce((acc, permission) => {
  acc[permission] = { type: Boolean, default: false }
  return acc
}, {} as Record<PermissionKey, { type: typeof Boolean; default: boolean }>)

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
    
    permissions: permissionsSchemaDefinition,

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
    const options = this.getOptions()
    if (!options.includeDeleted) {
      this.where({ isDeleted: false })
    }
    next()
  }
)

const Role = mongoose.model<RoleInterface>('Role', roleSchema)
export default Role