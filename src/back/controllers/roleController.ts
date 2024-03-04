import { Request, Response } from "express"
import { Role } from "../models/Role"

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find(
      {
        select: {
          id: true,
          name: true
        }
      }
    )

    res.status(200).json(
      {
        success: true,
        message: 'Roles retrieved succesfully',
        data: roles
      }
    )
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Could not get roles",
      error: error
    })
  }
}
export const createRoles = async (req: Request, res: Response) => {
  try {

    //recuperar info mediante body
    const name = req.body.name

    //validacion=>
    if (name.length > 50) {
      return res.status(400).json({
        succes: false,
        message: "Role name must be under 50 char"
      })
    }

    const newRole = await Role.create({
      name: name,
    }).save()

    res.status(201).json(
      {
        success: true,
        message: 'Roles Created succesfully',
        data: newRole
      }
    )

  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Catch here => error in function",
      error: error
    })
  }
}
export const updateRolesById = async (req: Request, res: Response) => {
  try {

    const roleId = req.params.id
    const newName = req.body.name

    const role = await Role.findOneBy({
      id: parseInt(roleId)
    })

    if (!role) {
      return res.status(404).json({
        succes: false,
        message: "Role not found"
      })
    }

    const updateRole = await Role.update({
      id: parseInt(roleId)
    }, {
      name: newName
    })

    res.status(200).json(
      {
        success: true,
        message: 'Roles updated succesfully'
      }
    )
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Could not update roles",
      error: error
    })
  }
}
export const deleteRolesById = async (req: Request, res: Response) => {

  try {
    const roleId = req.params.id

    const roleToRemove = await Role.findOneBy({
      id: parseInt((roleId))
    })

    if (!roleToRemove) {
      return res.status(404).json({
        succes: false,
        message: "Role not found"
      })
    }

    const roleDeleted = await Role.remove(roleToRemove)

    res.status(200).json(
      {
        success: true,
        message: 'Roles updated succesfully',
        data: roleDeleted
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: 'Could not delete role'
      }
    )
  }
}