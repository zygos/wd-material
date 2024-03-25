import { fakeUser } from '@server/entities/tests/fakes';
import { authUserSchema } from '@server/entities/user';
/**
 * Creates a mock Express context object for testing purposes.
 * @param context - The context object to be partially overridden.
 * @returns A new context object with the provided properties and default mock values.
 */
export const requestContext = (context) => ({
    req: {
        header: () => undefined,
        get: () => undefined,
    },
    res: {
        cookie: () => undefined,
    },
    ...context,
});
/**
 * Creates a new context object with an authenticated user.
 * @param context - The context object to extend.
 * @param user - The authenticated user to add to the context.
 * @returns A new context object with the authenticated user added.
 */
export const authContext = (context, user = fakeUser()) => ({
    authUser: authUserSchema.parse(user),
    ...context,
});
