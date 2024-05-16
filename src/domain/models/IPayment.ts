export interface IPayment {
  involvesWatchonly: boolean
  account: string
  address: string
  category: string
  amount: number
  label: string
  confirmations: number
  blockhash: string
  blockindex: number
  blocktime: Date
  txid: string
  vout: number
  time: Date
  timereceived: Date
  bip125Replaceable: string
}
