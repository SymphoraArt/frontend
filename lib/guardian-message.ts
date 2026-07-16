/** Canonical message a wallet guardian signs to confirm their role.
 *  Shared by the /guardian page (signing) and the confirm route (verifying). */
export function guardianMessage(token: string) {
  return `Enki Art guardian confirmation\nI agree to act as a recovery guardian.\nToken: ${token}`;
}
