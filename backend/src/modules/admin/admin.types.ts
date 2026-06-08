export interface GetUsersQuery {

    page?: number;

    limit?: number;

    role?: "USER" | "VENDOR" | "ADMIN";

    search? : string
}

export interface GetBookingsQuery {

    status?: string;

    page?: number;

    limit?: number;
}

