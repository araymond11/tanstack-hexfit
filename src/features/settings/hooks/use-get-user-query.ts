import type { User } from '#/types/user'
import { queryOptions, useQuery, type UseQueryOptions } from '@tanstack/react-query'

const fakeUser: User = {
  firstname: 'Jean',
  lastname: 'Dupont',
  email: 'jean.dupont@exemple.com',
}

export const userQueryOptions = queryOptions<User>({
  queryKey: ['user', 'me'],
  queryFn: () => new Promise<User>((resolve) => setTimeout(() => resolve(fakeUser), 500)),
})

export const userQueryKey = userQueryOptions.queryKey

export const useGetUserQuery = (options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>) => {
  return useQuery({ ...userQueryOptions, ...options })
}
