import { ProjectModel } from '@/models/project.model'
import { apiService } from '@/services/api-service'
import { StrapiParams } from '@/services/api-service/models/strapi-params'
import { flatten } from '@/utils/strapi-helper'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

interface Options {
  params?: StrapiParams
  enabled?: boolean
}

interface State {
  params: StrapiParams
}

export const useProjects = (optionsArgs?: Options) => {
  const api = apiService.project
  const options: Options = {
    params: {
      pagination: {
        page: 1,
        pageSize: 10,
      },
    },
    enabled: true,
    ...optionsArgs,
  }
  const [state, setState] = useState<State>({
    params: options.params ?? {},
  })

  const { data: projectsData, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects-query', JSON.stringify(state.params)],
    queryFn: async () => {
      const res = await api.fetch(state.params)
      console.log('zyta.project-query.res', res)
      return { data: flatten(res?.data ?? []), pagination: res?.meta?.pagination }
    },
    enabled: options.enabled,
  })

  const projects = useMemo<ProjectModel[]>(() => projectsData?.data ?? [], [projectsData])
  const projectsPagination = useMemo(() => projectsData?.pagination, [projectsData])

  const fetchProjects = (params: StrapiParams): void => {
    setState({
      params: {
        pagination: {
          page: 1,
          pageSize: 10,
        },
        ...params,
      },
    })
  }

  return {
    // states,
    state,
    isLoadingProjects,

    // memos
    projects,
    projectsPagination,

    // functions
    fetchProjects,
  }
}
