import { Directus } from "@directus/sdk";

export const directus = new Directus("https://video-game-marketplace.directus.app/", {
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
            role: "4a895809-2391-4733-8b77-8d27ea11ae4c"
        });

        /* convert string to boolean to check if register was successful */
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