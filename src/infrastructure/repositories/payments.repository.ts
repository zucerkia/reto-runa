import { IPayment } from "@domain/models/IPayment"
import { IUsers } from "@domain/models/IUsers"
import {
  IKnownUserData,
  IMinMaxValidAmounts,
  IPaymentsRepository,
  IUnknownUserData,
} from "@domain/repositories/payments.repository"
import prisma from "@infrastructure/orm/prisma"

class PaymentsRepository implements IPaymentsRepository {
  private readonly model
  constructor() {
    this.model = prisma.payments
  }

  async saveAll(bulkData: IPayment[]): Promise<number> {
    return await this.model
      .createMany({ data: bulkData })
      .then((data) => data.count)
  }

  async getMinMax(): Promise<IMinMaxValidAmounts> {
    const result = await prisma.payments.aggregate({
      _min: {
        amount: true,
      },
      _max: {
        amount: true,
      },
      where: {
        confirmations: {
          gte: 6,
        },
        category: "receive",
      },
    })

    return {
      min: result._min.amount,
      max: result._max.amount,
    }
  }

  async getUnknownUsers(users: string[]): Promise<IUnknownUserData | null> {
    const result = await this.model.aggregate({
      _count: {
        _all: true,
      },
      _sum: {
        amount: true,
      },
      where: {
        confirmations: {
          gte: 6,
        },
        category: "receive",
        address: {
          notIn: users,
        },
      },
    })

    return {
      sum: result._sum.amount,
      count: result._count._all,
    }
  }

  async getKnownUsers(users: string[]): Promise<IKnownUserData[] | null> {
    const result = await this.model.groupBy({
      by: ["address"],
      where: {
        confirmations: {
          gte: 6,
        },
        category: "receive",
        address: {
          in: users,
        },
      },
      _count: {
        _all: true,
      },
      _sum: {
        amount: true,
      },
    })

    return result.map(({ _count, _sum, address }) => ({
      name: IUsers[address as keyof typeof IUsers] || "Unknown",
      address,
      sum: _sum.amount,
      count: _count._all,
    }))
  }
}

export default PaymentsRepository
