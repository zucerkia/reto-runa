import ExpressServer from "@infrastructure/server"

const main = async () => {
  try {
    const server = new ExpressServer()
    server.listen(3000)
  } catch (error) {
    console.error(error)
  }
}

main()
