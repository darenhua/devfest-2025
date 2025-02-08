import { relations } from "drizzle-orm";
import {
    boolean,
    date,
    integer,
    jsonb,
    pgEnum,
    pgSchema,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

// core entity types
export const organizations = pgTable("organizations", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    enableHraFeatures: boolean("enable_hra_features").notNull().default(false),
    hraPhysicalCardEnabled: boolean("hra_physical_card_enabled")
        .notNull()
        .default(false),
    inactiveAt: timestamp("inactive_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
});

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    emailAddress: varchar("email_address", { length: 255 }).notNull().unique(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    isSuperAdmin: boolean("is_super_admin").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
});

export const organizationsUsers = pgTable(
    "organizations_users",
    {
        organizationId: uuid("organization_id")
            .references(() => organizations.id)
            .notNull(),
        userId: uuid("user_id")
            .references(() => users.id)
            .notNull(),
        role: varchar("role", { length: 255 }).notNull(),
        isActive: boolean("is_active").notNull().default(true),
        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.organizationId, table.userId] }),
        };
    }
);
