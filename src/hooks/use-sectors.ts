import { SectorModel } from '@/models/sector.model'
import { apiService } from '@/services/api-service'
import { StrapiParams } from '@/services/api-service/models/strapi-params'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

interface Options {
  params?: StrapiParams
}

interface State {
  params: StrapiParams
}

export const useSectors = (optionsArgs?: Options) => {
  const api = apiService.sector
  const options: Options = {
    params: {
      pagination: {
        page: 1,
        pageSize: 10,
      },
    },
    ...optionsArgs,
  }
  const [state, setState] = useState<State>({
    params: options.params ?? {},
  })

  const { data: sectorsData, isLoading: isLoadingsectors } = useQuery({
    queryKey: ['sectors-query', state.params],
    queryFn: async () => {
      const res = await api.find(state.params)
      return res
    },
  })

  const sectors = useMemo<SectorModel[]>(() => sectorsData?.data ?? [], [sectorsData])
  // const sectorsPagination = computed(() => sectorsRes.value?.pagination)
  const sectorsPagination = useMemo(() => sectorsData?.meta.pagination, [sectorsData])

  const fetchSectors = (params: StrapiParams): void => {
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
    isLoadingsectors,

    // memos
    sectors,
    sectorsPagination,

    // functions
    fetchSectors,
  }
}
