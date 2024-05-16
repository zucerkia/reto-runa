import init from "@infrastructure/config/init"
import FileController from "@interface/controllers/File.controller"

const main = async () => {
  try {
    init()
    const fileController = new FileController()
    await fileController.saveAll()
    await fileController.getTransactions()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
