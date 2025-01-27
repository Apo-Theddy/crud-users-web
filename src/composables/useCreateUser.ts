import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { UserService } from "../services/UserService";
import type { IUser } from "../interfaces/User";

export const useCreateUser = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (user: IUser) => UserService.createUser(user),
    onSuccess: () => query.invalidateQueries({ queryKey: ["users"] }),
    onError: (error) => error
  })
}
