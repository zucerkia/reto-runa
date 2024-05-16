import type { IPayment } from "@domain/models/IPayment"

export interface IKnownUserData {
  name: string
  address: string
  count: number
  sum: number | null
}

export type IUnknownUserData = Omit<IKnownUserData, "address" | "name">

export interface IMinMaxValidAmounts {
  min: number | null
  max: number | null
}

export interface IPaymentsRepository {
  saveAll: (payment: IPayment[]) => Promise<number>
  getKnownUsers: (user: string[]) => Promise<IKnownUserData[] | null>
  getUnknownUsers: (user: string[]) => Promise<IUnknownUserData | null>
  getMinMax: () => Promise<IMinMaxValidAmounts>
}
