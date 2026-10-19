// src/interface/db.interface.ts
import type { Types } from 'mongoose'
import type { PermissionsMap } from '../constants/permissions.constant'

export interface RoleInterface {
  name: string
  description: string
  status: 'active' | 'inactive' | 'disabled'
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
  assetName: string
  description: string
  status: 'active' | 'inactive' | 'disabled'
  serialNumber?: string
  qty?: number

  createdAt?: Date
  createdBy?: Types.ObjectId
  updatedAt?: Date
  updatedBy?: Types.ObjectId
  isDeleted?: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId
}

export interface AssignAssetInterface {
  asset: Types.ObjectId
  user: Types.ObjectId
  itemQty: number
  status: 'active' | 'inactive' | 'disabled' | 'assigned' | 'returned'

  createdAt?: Date
  createdBy?: Types.ObjectId
  updatedAt?: Date
  updatedBy?: Types.ObjectId
  isDeleted?: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId
}
