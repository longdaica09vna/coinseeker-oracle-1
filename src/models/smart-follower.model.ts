import { ProjectModel } from './project.model'

export interface SmartFollowerModel {
  id?: number

  createdAt?: string
  updatedAt?: string

  screenName?: string
  avatar?: string
  twitterId?: string
  name?: string
  position?: string
  company?: string

  // relations
  projects?: ProjectModel[]
}
