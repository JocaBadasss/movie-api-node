const { hash, compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserControllers {
  async create(req, res) {
    const { name, email, password } = req.body

    const checkIfUserExists = await knex("users")
      .select("*")
      .where("email", email)

    if (checkIfUserExists.length > 0) {
      throw new AppError("Este e-mail já está em uso")
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    })

    return res.json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const user_id = req.user.id

    const user = await knex("users").select("*").where("id", user_id).first()

    if (!user) {
      throw new AppError("User not found")
    }

    if (email) {
      const emailAlreadyInUse = await knex("users")
        .select("*")
        .where("email", email)
        .first()

      if (emailAlreadyInUse && emailAlreadyInUse.id !== user.id) {
        throw new AppError("Email already in use")
      }
    }

    user.name = name || user.name
    user.email = email || user.email

    if (password && !old_password) {
      throw new AppError("You need to enter the old password")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("the old password is incorrect")
      }
      user.password = await hash(password, 8)
    }

    await knex("users").where("id", user_id).update({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    return res.json()
  }
}

module.exports = UserControllers
