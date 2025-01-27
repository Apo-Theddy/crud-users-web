import axiosInstance from "../config/Axios";
import type { IDisplayUser } from "../interfaces/DisplayUsert";
import type { IUser } from "../interfaces/User";

export class UserService {
  public static async getAllUsers(page?: number): Promise<IDisplayUser> {
    const { data } = await axiosInstance.get<IDisplayUser>(`/users/all`, { params: { "page": page } });
    return {
      total: data["total"],
      users: data["users"],
    };
  }

  public static async getUserById(id: number): Promise<IUser> {
    const { data } = await axiosInstance.get<IUser>(`/users/by-id`, { params: { "id": id } });
    return data;
  }

  public static async createUser(user: IUser): Promise<IUser> {
    const { name, age, email } = user;
    const { data } = await axiosInstance.post<IUser>("/users", {
      name,
      age,
      email,
    });
    return data;
  }

  public static async search(query: string): Promise<IDisplayUser> {
    const { data } = await axiosInstance.get<IDisplayUser>("/users/search", { params: { query } });
    return data;
  }

  public static async updateUser(user: IUser): Promise<IUser> {
    const { name, age, email, id } = user;

    const { data } = await axiosInstance.put<IUser>("/users", {
      name,
      age,
      email,
      id,
    });

    return data;
  }

  public static async deleteUser(id: number): Promise<void> {
    await axiosInstance.delete(`/users/${id}`);
  }

}
