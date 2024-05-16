import { IPayment } from "@domain/models/IPayment"
import { IPaymentsRepository } from "@domain/repositories/payments.repository"

class SaveFileDataService {
  constructor(private readonly paymentsRepository: IPaymentsRepository) {}

  async execute(payments: IPayment[]): Promise<number> {
    return this.paymentsRepository.saveAll(payments)
  }
}

export default SaveFileDataService
