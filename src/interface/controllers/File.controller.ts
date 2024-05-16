import fs from "fs/promises"
import path from "path"

import SaveFileDataService from "@application/services/saveFileData.service"
import PaymentsRepository from "@infrastructure/repositories/payments.repository"
import { IPayment } from "@domain/models/IPayment"
import { ITransaction, ITransactionsFile } from "types/transactionsFile"
import GetValidDeposits from "@application/services/getValidDeposits"

class FileController {
  private readonly saveFileDataService
  private readonly getValidTransactions
  private readonly fileSystem
  readonly basePath = path.join(__dirname, "../data")
  readonly path = path

  constructor() {
    this.fileSystem = fs
    this.saveFileDataService = new SaveFileDataService(new PaymentsRepository())
    this.getValidTransactions = new GetValidDeposits(new PaymentsRepository())
  }

  private serialize(transaction: ITransaction): IPayment {
    return {
      blocktime: new Date(transaction.blocktime),
      account: transaction.account,
      address: transaction.address,
      category: transaction.category,
      amount: transaction.amount,
      label: transaction.label,
      confirmations: transaction.confirmations,
      blockhash: transaction.blockhash,
      blockindex: transaction.blockindex,
      txid: transaction.txid,
      vout: transaction.vout,
      timereceived: new Date(transaction.timereceived),
      time: new Date(transaction.time),
      bip125Replaceable: transaction["bip125-replaceable"],
      involvesWatchonly: transaction.involvesWatchonly,
    }
  }

  private async readFiles(): Promise<IPayment[]> {
    try {
      const files = await this.fileSystem.readdir(this.basePath)
      let transactions: IPayment[] = []

      for (let file of files) {
        if (this.path.extname(file) === ".json") {
          const filePath = this.path.join(this.basePath, file)
          const fileData = await this.fileSystem.readFile(filePath, "utf8")
          const parsedData = JSON.parse(fileData) as ITransactionsFile

          const paymentsMap = parsedData.transactions.map<IPayment>(
            (transaction) => this.serialize(transaction)
          )
          transactions = [...transactions, ...paymentsMap]
        }
      }
      return transactions
    } catch (err) {
      console.error("Error al procesar los archivos JSON", err)
      return []
    }
  }

  private async saveFile(data: IPayment[]): Promise<number> {
    const response = await this.saveFileDataService.execute(data)
    return response
  }

  async saveAll(): Promise<void> {
    try {
      const data = await this.readFiles()
      await this.saveFile(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getTransactions() {
    try {
      const response = await this.getValidTransactions.execute()

      if (
        response &&
        response.knownUsers &&
        response.minMax &&
        response.unknownUsers
      ) {
        const { knownUsers, unknownUsers, minMax } = response

        knownUsers.forEach(({ name, count, sum }) => {
          console.log(`Deposited for ${name}: count=${count} sum=${sum}`)
        })
        console.log(
          `Deposited without reference: count=${unknownUsers.count} sum=${unknownUsers.sum}`
        )
        console.log(`Smallest valid deposit: ${minMax.min}`)
        console.log(`Largest valid deposit: ${minMax.max}`)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default FileController
