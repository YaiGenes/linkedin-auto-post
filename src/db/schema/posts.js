import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    imageurl: text('imageurl').notNull(),
    publishdate: integer('publishdate').notNull(),
  });