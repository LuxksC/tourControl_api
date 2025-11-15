import {
  date,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const userType = pgEnum('user_type', [
  'admin',
  'athlete',
  'coach',
  'referee',
  'staff'
]);

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  gender: varchar({ length: 6 }).notNull(),
  birthDate: date('birth_date').notNull(),
  type: userType().notNull().default('athlete'),
  phone: varchar({ length: 20 }),
  cpf: varchar({ length: 14 }).unique(),
  pix: varchar({ length: 255 }),
  tournaments_managed_ids: varchar({ length: 255 }).array().default([]),
  tournaments_enrolled_ids: varchar({ length: 255 }).array().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at')
})