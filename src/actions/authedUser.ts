export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(user: string) {
  return {
    type: SET_AUTHED_USER,
    user,
  };
}
