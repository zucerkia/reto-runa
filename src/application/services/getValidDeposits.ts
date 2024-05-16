import { IUsers } from "@domain/models/IUsers"
import { IPaymentsRepository } from "@domain/repositories/payments.repository"

class GetValidDeposits {
  constructor(private readonly paymentsRepository: IPaymentsRepository) {}

  async execute() {
    const users = Object.keys(IUsers)

    const minMax = await this.paymentsRepository.getMinMax()
    const knownUsers = await this.paymentsRepository.getKnownUsers(users)
    const unknownUsers = await this.paymentsRepository.getUnknownUsers(users)

    return {
      minMax,
      knownUsers,
      unknownUsers,
    }
  }
}

export default GetValidDeposits
