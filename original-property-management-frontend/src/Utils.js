import Constants from "./Constants";
import jwt_decode from "jwt-decode";

export function storeToken(token) {
    localStorage.setItem(Constants.AUTH_TOKEN, token);
}

export function clearToken() {
    localStorage.removeItem(Constants.AUTH_TOKEN);
}

export function getToken() {
    return localStorage.getItem(Constants.AUTH_TOKEN);
}

export function deriveEmailFromToken() {
    return jwt_decode(getToken()).email;
}

export function isRole(role) {
    try {
        const auth = jwt_decode(getToken());
        return auth?.realm_access?.roles?.includes(role);
    } catch (e) {
        return false;
    }
}

export const currencyUSDFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

export function getLoggedRoles() {
    const access = jwt_decode(getToken()).realm_access.roles;
    const roles = access.find(el => Constants.ROLE_NAME.includes(el));
    return roles;
}