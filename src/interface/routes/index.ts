import { Router } from "express"

const MainRouter = Router()

MainRouter.get("/test", (req, res) => {
  res.status(200).json({ message: "hola mundo" })
})

export default MainRouter
