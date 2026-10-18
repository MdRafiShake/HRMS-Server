// src/interface/db.interface.ts
import type { Types } from 'mongoose'
import type { PermissionsMap } from '../constants/permissions.constant'

export interface RoleInterface {
  name: string
  description: string
  status: 'active' | 'inactive'
  permissions: PermissionsMap
  
  createdAt?: Date
  createdBy?: Types.ObjectId
  updatedAt?: Date
  updatedBy?: Types.ObjectId
  isDeleted?: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId
}

export interface AssetInterface {
  name: string
  description: string
  status: 'active' | 'inactive'
  
  createdAt?: Date
  createdBy?: Types.ObjectId
  updatedAt?: Date
  updatedBy?: Types.ObjectId
  isDeleted?: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId
}