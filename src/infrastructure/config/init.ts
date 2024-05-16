import dotenv from "dotenv"
import prisma from "@infrastructure/orm/prisma"

dotenv.config()

const init = async (): Promise<void> => {
  try {
    await prisma.$connect()
  } catch (err) {
    console.error("Unable to connect to the database:", err)
  }
}

export default init
