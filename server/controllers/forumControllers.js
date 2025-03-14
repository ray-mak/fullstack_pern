const PrismaClient = require("@prisma/client").PrismaClient

const prisma = new PrismaClient()

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()

  if (!users) {
    return res.status(404).json({ message: "No users found" })
  }

  res.json(users)
}

module.exports = { getUsers }
