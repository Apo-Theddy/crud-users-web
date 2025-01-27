import type { Ref } from "vue";
import type { IDisplayUser } from "../interfaces/DisplayUsert";
import { useQuery } from "@tanstack/vue-query";
import { UserService } from "../services/UserService";

export const useSearchUserQuery = (query: Ref<string>) => {
  return useQuery<IDisplayUser>({
    queryKey: ["users", query.value],
    queryFn: () => UserService.search(query.value),
    staleTime: 0,
    enabled: true,
  })
}
