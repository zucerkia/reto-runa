import MainRouter from "@interface/routes"
import express from "express"

class ExpressServer {
  private readonly app

  constructor() {
    this.app = express()
    this.routes()
  }

  private routes() {
    this.app.use("/api", MainRouter)
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }
}

export default ExpressServer
