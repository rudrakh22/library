export type UserRole =
    | "USER"
    | "VENDOR"
    | "ADMIN";

export interface CurrentUser {

    id: string;

    clerkId: string;

    email: string;

    firstName: string | null;

    lastName: string | null;

    imageUrl: string | null;

    role: UserRole;
}