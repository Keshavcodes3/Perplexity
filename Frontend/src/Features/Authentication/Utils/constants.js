export const API_BASE_URL =
    import.meta.env.VITE_API_URL || "";

export const AUTH_ROUTES = {
    register: "/register",
    login: "/login",
    logout: "/logout",
    me: "/user",
};

/* Avatar upload */

export const AVATAR_ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
];

export const AVATAR_MAX_SIZE_MB = 5;