import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { User } from '#/types/user'
import { userQueryKey } from './use-get-user-query'

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<Partial<User>, Error, Partial<User>>({
    mutationFn: async (payload) => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return payload
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({queryKey: userQueryKey})
    },
  })
}

