import { RolesTypes } from "./enum.role";

export interface UserInterface {
    id:string;
    email: string;
    roles: RolesTypes[];
}
