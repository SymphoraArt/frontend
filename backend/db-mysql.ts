/**
 * MySQL database connection and schema for Symphora.
 * Phase 2 will use MongoDB instead for scalability; this module is for the current phase.
 */

import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;
let isConnected = false;

const DATABASE_URL = process.env.DATABASE_URL;
const MYSQL_HOST = process.env.MYSQL_HOST ?? "localhost";
const MYSQL_PORT = Number(process.env.MYSQL_PORT || "3306");
const MYSQL_USER = process.env.MYSQL_USER ?? "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? "symphora";

function getConfig(): mysql.PoolOptions | string | null {
  if (DATABASE_URL?.trim()) {
    return DATABASE_URL.trim();
  }
  if (!MYSQL_HOST || !MYSQL_DATABASE) {
    return null;
  }
  return {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
    timezone: "Z",
  };
}

/**
 * Initialize schema (CREATE TABLE IF NOT EXISTS). Safe to run on every connect.
 */
async function initSchema(conn: mysql.PoolConnection): Promise<void> {
  const sql = `
CREATE TABLE IF NOT EXISTS symphora_prompts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  creator VARCHAR(255) NOT NULL,
  type ENUM('showcase', 'free', 'paid') NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  ai_settings JSON,
  pricing JSON,
  prompt_data JSON NOT NULL,
  showcase_images JSON,
  stats JSON,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  published_at DATETIME(3) NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_type_created (type, created_at),
  KEY idx_type_category_created (type, category, created_at),
  KEY idx_creator_created (creator(191), created_at),
  KEY idx_is_featured_type (is_featured, type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS symphora_prompt_likes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  prompt_id INT UNSIGNED NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_prompt_user (prompt_id, user_id(191)),
  KEY idx_prompt (prompt_id),
  CONSTRAINT fk_likes_prompt FOREIGN KEY (prompt_id) REFERENCES symphora_prompts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS symphora_generations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  prompt_id INT UNSIGNED NOT NULL,
  variable_values JSON,
  reference_images JSON,
  final_prompt JSON,
  generated_image JSON,
  used_settings JSON,
  transaction_data JSON,
  status ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  error_data JSON,
  is_private TINYINT(1) NOT NULL DEFAULT 0,
  likes INT UNSIGNED NOT NULL DEFAULT 0,
  bookmarks INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  completed_at DATETIME(3) NULL,
  PRIMARY KEY (id),
  KEY idx_user_created (user_id(191), created_at),
  KEY idx_prompt_created (prompt_id, created_at),
  KEY idx_status_created (status, created_at),
  CONSTRAINT fk_generations_prompt FOREIGN KEY (prompt_id) REFERENCES symphora_prompts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS symphora_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  wallet_addresses JSON,
  profile JSON,
  stats JSON,
  seller_profile JSON,
  created_at DATETIME(3) NULL,
  updated_at DATETIME(3) NULL,
  last_active DATETIME(3) NULL,
  PRIMARY KEY (id),
  KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));
  for (const stmt of statements) {
    await conn.execute(stmt);
  }
}

/**
 * Connect to MySQL and run schema init. Idempotent.
 */
export async function connectDB(): Promise<void> {
  const config = getConfig();
  if (!config) {
    console.warn("⚠️  MySQL not configured (set DATABASE_URL or MYSQL_HOST/MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE). Symphora will run without persistence.");
    return;
  }

  if (isConnected && pool) {
    return;
  }

  try {
    pool = typeof config === "string" ? mysql.createPool(config) : mysql.createPool(config);
    const conn = await pool.getConnection();
    try {
      await initSchema(conn);
    } finally {
      conn.release();
    }
    isConnected = true;
    console.log("✅ Connected to MySQL (Symphora). Phase 2 will use MongoDB for scalability.");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
    pool = null;
    isConnected = false;
    console.warn("⚠️  Continuing without Symphora database persistence.");
  }
}

export async function disconnectDB(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    isConnected = false;
    console.log("✅ MySQL connection closed");
  }
}

export function isDbConnected(): boolean {
  return isConnected && pool !== null;
}

/** Get MySQL pool (null if not configured or not connected). */
export function getPool(): mysql.Pool | null {
  return pool;
}
