import mongoose, { Schema } from 'mongoose'
import type { DepartmentInterface } from './department.interface.js'

const departmentSchema = new Schema<DepartmentInterface>(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'disabled'],
      default: 'active',
      index: true
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
      default: false,
      index: true
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

// --- PARTIAL UNIQUE INDEX FOR SOFT DELETES ---
// Enforces unique department names only for active (non-deleted) records,
// allowing reuse of department names of deleted records.
departmentSchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false }
  }
)

// --- SOFT DELETE MIDDLEWARE ---
departmentSchema.pre(
  /^find/,
  function (this: mongoose.Query<any, DepartmentInterface>, next) {
    const options = this.getOptions()
    if (!options.includeDeleted) {
      this.where({ isDeleted: false })
    }
    next()
  }
)

export const Department = mongoose.model<DepartmentInterface>(
  'Department',
  departmentSchema
)
export default Department
