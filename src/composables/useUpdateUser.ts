import { useMutation, useQueryClient } from "@tanstack/vue-query"
import type { IUser } from "../interfaces/User";
import { UserService } from "../services/UserService";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: IUser) => UserService.updateUser(updatedUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: (error) => {
      console.error(error);
    }
  })
}
