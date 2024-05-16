export interface ITransactionsFile {
  transactions: ITransaction[]
  removed: any[]
  lastblock: string
}

export interface ITransaction {
  involvesWatchonly: boolean
  account: string
  address: string
  category: Category
  amount: number
  label: string
  confirmations: number
  blockhash: string
  blockindex: number
  blocktime: Date
  txid: string
  vout: number
  walletconflicts: any[]
  time: Date
  timereceived: Date
  "bip125-replaceable": Bip125Replaceable
}

export enum Bip125Replaceable {
  No = "no",
}

export enum Category {
  Receive = "receive",
  Send = "send",
}
