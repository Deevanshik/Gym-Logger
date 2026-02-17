import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        defaultSeeding: {
          type: "boolean",
          defaultValue: false,
          required: false,
        },
      },
    }),
  ],
});
