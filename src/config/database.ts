import { Pool, QueryResultRow } from "pg";
import { env } from "./env.ts";

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: env.DATABASE_URL,
      max: 10,
      //   How long an unused connection can remain in the pool before PostgreSQL's client library closes it.
      idleTimeoutMillis: 30000,
      //   Maximum time to wait when acquiring a connection from the pool before timing out.
      connectionTimeoutMillis: 2000,
    });

    this.pool.on("connect", () => {
      console.log("PostgreSQL connected.");
    });
    this.pool.on("error", (err) => {
      console.error("Unexpected database connection error: ", err);
    });
  }

  async query<T extends QueryResultRow>(sql: string, params: unknown[] = []) {
    return this.pool.query<T>(sql, params);
  }

  async connect() {
    return this.pool.connect();
  }

  async close() {
    return this.pool.end();
  }
}

export default new Database();
