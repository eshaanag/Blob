import { pgTable, text, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";

export const oauthAccounts = pgTable(
  "oauth_accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerId: text("provider_id").notNull(), 
    providerUserId: text("provider_user_id").notNull(), 
    accessToken: text("access_token"), 
    refreshToken: text("refresh_token"), 
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
  })
);

export type OAuthAccount = typeof oauthAccounts.$inferSelect;
export type NewOAuthAccount = typeof oauthAccounts.$inferInsert;
