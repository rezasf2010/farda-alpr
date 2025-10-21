const DEFAULT_USERS_ENDPOINT = '/api/users';

/**
 * Allows frontend code to point to a different backend host without touching component logic.
 * NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_USERS_ENDPOINT can be overridden per environment or `.env.local`.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

const resolvedUsersEndpoint =
  process.env.NEXT_PUBLIC_USERS_ENDPOINT ??
  (API_BASE_URL ? `${API_BASE_URL}${DEFAULT_USERS_ENDPOINT}` : DEFAULT_USERS_ENDPOINT);

export type PermissionKey = '1' | '2' | '3' | '4';

export type CreateUserFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  permissions: PermissionKey[];
};

export type CreateUserPayload = {
  f_name: string;
  l_name: string;
  user_name: string;
  password: string;
  permission: Record<PermissionKey, boolean>;
};

const defaultPermissionMap: Record<PermissionKey, boolean> = {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
};

const buildPayload = (values: CreateUserFormValues): CreateUserPayload => {
  const permission = values.permissions.reduce<Record<PermissionKey, boolean>>(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    { ...defaultPermissionMap },
  );

  return {
    f_name: values.firstName.trim(),
    l_name: values.lastName.trim(),
    user_name: values.username.trim(),
    password: values.password,
    permission,
  };
};

export const userService = {
  endpoint: resolvedUsersEndpoint,
  /**
   * Explicitly expose the payload mapping so backend collaborators can reuse it in tests.
   */
  toPayload: buildPayload,
  async createUser(values: CreateUserFormValues, fetchImpl: typeof fetch = fetch) {
    const payload = buildPayload(values);

    const response = await fetchImpl(resolvedUsersEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`User create failed with status ${response.status}`);
    }

    return response;
  },
};
