import { User } from "./user";

export interface UserWithKey extends User {
  hasKey: boolean;
}
