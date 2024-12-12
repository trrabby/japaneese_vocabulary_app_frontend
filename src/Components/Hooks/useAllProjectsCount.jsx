import { useQuery } from '@tanstack/react-query'
import { useAxiosCommon } from './useAxiosCommon'

export const useAllProjectsCount = () => {

  const axiosCommon = useAxiosCommon()

  const { data: projectsCount = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['projectsCount'],
    queryFn: () => projectsCountData(),
  })

  const projectsCountData = async () => {
    const { data } = await axiosCommon('/projects')
    return data.length
  }

  return {projectsCount, isLoading, isError, error, refetch}
}
