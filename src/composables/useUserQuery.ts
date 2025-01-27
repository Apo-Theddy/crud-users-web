import { UserService } from "../services/UserService"
import { useQuery } from "@tanstack/vue-query"
import type { Ref } from "vue"
import type { IDisplayUser } from "../interfaces/DisplayUsert"

export const useUserQuery = (page: Ref<number>) => {
  return useQuery<IDisplayUser>({
    queryKey: ["users", page.value],
    queryFn: () => UserService.getAllUsers(page.value),
    staleTime: 0,
    enabled: true,
  })
}
