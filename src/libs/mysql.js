import dotenv from 'dotenv';
dotenv.config();
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: process.env.DB_HOST, authToken: process.env.DB_TOKEN });
export const conn = drizzle(client);