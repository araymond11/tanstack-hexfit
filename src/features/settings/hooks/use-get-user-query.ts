import type { User } from '#/types/user'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

const fakeUser: User = {
  firstname: 'Jean',
  lastname: 'Dupont',
  email: 'jean.dupont@exemple.com',
}

type UserQueryResponse = {
  user: User
}

type GetUserQueryOptions = UseQueryOptions<{}, Error, UserQueryResponse>

export const userQueryKey = ['user', 'me']

export const useGetUserQuery = (options?: GetUserQueryOptions) =>  {
  return useQuery({
  queryKey: ['user', 'me'],
  queryFn: () => new Promise<User>((resolve) => setTimeout(() => resolve(fakeUser), 500)),
  gcTime: 0,
  ...options
  })
}
