import { Directus } from "@directus/sdk";

export const directus = new Directus("https://n8mifr5t.directus.app", {
    auth: {
        mode: "json",
    },
});

export const authService = {
    async login(email: string, password: string) {
        return await directus.auth.login({ email, password });
    },
    async register(firstName: string, email: string, password: string): Promise<boolean> {
        const createUserResult = await directus.users.createOne({
            first_name: firstName,
            email,
            password,
            role: "d0a26a37-368f-4e12-9492-f8182b604080"
        });

        return !!createUserResult?.email;

    },
    async logout() {
        return await directus.auth.logout();
    },
    async currentUser() {
        return await directus.users.me.read({
            fields: ['email', 'first_name']
        });
    }
};