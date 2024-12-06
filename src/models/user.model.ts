// import type { DiscordUserModel } from './discord-user.model'
// import type { PayPlanTransactionModel } from './pay-plan-transaction'
// import type { ProfileModel } from './profile.model'
// import type { RoleModel } from './role.model'
// import type { SyndicateCodeModel } from './syndicate-code.model'
// import type { TwitterUserModel } from './twitter-user.model'
// import type { ReferralModel } from './referral.model'
// import type { TelegramUserModel } from './telegram-user.model'
// import type { TelegramMiniUserModel } from './tele-mini-user.model'

import { RoleModel } from './role.model'

export type UserRole = 'Pro' | 'Authenticated'

export interface UserModel {
  id?: number

  createdAt?: string
  updatedAt?: string

  username?: string
  email?: string
  provider?: string

  boardName?: string
  boardDescription?: string
  viewToken?: string
  editToken?: string
  walletAddress?: string
  cosmosWalletAddress?: string
  distributeWalletAddress?: string
  planExpiredAt?: string
  syndicateWallet?: string

  googleUserName?: string
  twitterUserName?: string
  linkedinUserName?: string
  totalPoint?: number
  verifiedSiwe?: boolean
  walletAuths?: unknown[]
  b2bPlanExpiredAt?: string
  permanentTeleAccount?: boolean
  tier?: UserTier

  // relations
  role?: RoleModel
  credits?: number
  // referral?: ReferralModel
  // profile?: ProfileModel
  // payPlanTx?: PayPlanTransactionModel
  // teleMiniUser?: TelegramMiniUserModel
  // telegramUser?: TelegramUserModel
  // syndicate?: SyndicateCodeModel
  // canEditSyndicate?: SyndicateCodeModel
  // b2bPayTx?: PayPlanTransactionModel
  // discord?: DiscordUserModel
  // syndicateCode?: SyndicateCodeModel[]
  // twitterUser?: TwitterUserModel
}

export enum UserTier {
  free = 'free',
  base = 'base',
  value = 'value',
  gold = 'gold',
  diamond = 'diamond',
  professional = 'professional',
  organisation = 'organisation',
}
