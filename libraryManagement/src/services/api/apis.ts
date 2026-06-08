export const USER_API = {

    CURRENT_USER:
        "/user/me",
    UPDATE_PROFILE:"/user/profile"
};

export const VENDOR_API = {

    APPLY:
        "/vendor/apply",

    PROFILE:
        "/vendor/profile",

    APPLICATION_STATUS:
        "/vendor/application-status",
};

export const ADMIN_API = {

    DASHBOARD:
        "/admin/dashboard",

    USERS:
        "/admin/users",

    LIBRARIES:
        "/admin/libraries",

    TOGGLE_LIBRARY:
        (
            libraryId: string
        ) =>
            `/admin/libraries/${libraryId}/toggle`,

    BOOKINGS:
        "/admin/bookings",

    REVENUE:
        "/admin/revenue",

    VENDOR_APPLICATIONS:
        "/admin/vendor-applications",

    APPROVE_VENDOR:
        (
            id: string
        ) =>
            `/admin/vendor/${id}/approve`,

    REJECT_VENDOR:
        (
            id: string
        ) =>
            `/admin/vendor/${id}/reject`,
};

export const LIBRARY_API = {

    CREATE:
        "/libraries",

    GET_ALL:
        "/libraries",

    GET_BY_ID:
        (id: string) =>
            `/libraries/${id}`,

    UPDATE:
        (id: string) =>
            `/libraries/${id}`,

    DELETE:
        (id: string) =>
            `/libraries/${id}`,
};