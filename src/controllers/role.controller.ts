import type { Request, Response, NextFunction } from "express";
import Role from "../models/roles.model.js";

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, permissions } = req.body;

    // 1. Validation using the global error handler
    if (!name) {
      const error: any = new Error("Role name is required.");
      error.statusCode = 400; 
      return next(error);     
    }

    // 2. Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      const error: any = new Error("Role already exists.");
      error.statusCode = 400;
      return next(error);
    }

    // 3. Create the role in MongoDB
    const newRole = await Role.create({
      name,
      description,
      permissions,
    });

    // 4. Success response
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: newRole,
    });

  } catch (error) {
    next(error); 
  }
};