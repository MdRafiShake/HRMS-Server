import Department from './department.model.js'
import type { DepartmentInterface } from './department.interface.js'

export const getAllDepartmentsService = async (limit: number, skip: number) => {
  return await Department.find().limit(limit).skip(skip)
}

export const getDepartmentByIdService = async (departmentId: string) => {
  return await Department.findById(departmentId).setOptions({
    includeDeleted: true
  })
}

export const getDepartmentRecycleBinService = async (
  limit: number,
  skip: number
) => {
  return await Department.find({ isDeleted: true })
    .setOptions({ includeDeleted: true })
    .limit(limit)
    .skip(skip)
}

export const findDepartmentByNameService = async (name: string) => {
  return await Department.findOne({ name })
}

export const createDepartmentService = async (departmentData: {
  name: string
  description?: string
  status?: 'active' | 'inactive' | 'disabled'
  createdBy?: any
}) => {
  const newDepartment = new Department(departmentData)
  await newDepartment.save()
  return newDepartment
}

export const updateDepartmentService = async (
  departmentId: string,
  updateData: Record<string, any>
) => {
  return await Department.findByIdAndUpdate(
    departmentId,
    { $set: updateData },
    {
      new: true,
      runValidators: true
    }
  )
}

export const deleteDepartmentService = async (
  departmentId: string,
  userId?: any
) => {
  return await Department.findByIdAndUpdate(
    departmentId,
    {
      $set: {
        isDeleted: true,
        deletedBy: userId,
        deletedAt: new Date()
      }
    },
    { new: true }
  )
}

export const restoreDepartmentService = async (
  departmentId: string,
  userId?: any
) => {
  return await Department.findByIdAndUpdate(
    departmentId,
    {
      $set: {
        isDeleted: false,
        deletedBy: null,
        deletedAt: null,
        updatedBy: userId
      }
    },
    { new: true, includeDeleted: true }
  )
}

export const departmentService = {
  getAllDepartments: getAllDepartmentsService,
  getDepartmentById: getDepartmentByIdService,
  getDepartmentRecycleBin: getDepartmentRecycleBinService,
  findDepartmentByName: findDepartmentByNameService,
  createDepartment: createDepartmentService,
  updateDepartment: updateDepartmentService,
  deleteDepartment: deleteDepartmentService,
  restoreDepartment: restoreDepartmentService
}

export default departmentService
