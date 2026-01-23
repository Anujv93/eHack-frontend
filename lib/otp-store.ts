/**
 * SQLite-based OTP Storage
 * 
 * Provides reliable OTP storage that persists across serverless function calls.
 * Uses better-sqlite3 for synchronous, fast SQLite operations.
 */

import Database from 'better-sqlite3';
import path from 'path';

// Database file path (in project root, add to .gitignore)
const DB_PATH = path.join(process.cwd(), 'otp-store.db');

// Initialize database
let db: Database.Database;

function getDb(): Database.Database {
    if (!db) {
        db = new Database(DB_PATH);

        // Create OTP table if not exists
        db.exec(`
            CREATE TABLE IF NOT EXISTS otp_codes (
                email TEXT PRIMARY KEY,
                otp TEXT NOT NULL,
                expires_at INTEGER NOT NULL,
                attempts INTEGER DEFAULT 0,
                created_at INTEGER DEFAULT (strftime('%s', 'now'))
            )
        `);

        // Create index for cleanup
        db.exec(`
            CREATE INDEX IF NOT EXISTS idx_expires_at ON otp_codes(expires_at)
        `);
    }
    return db;
}

export interface OTPData {
    otp: string;
    expiresAt: number;
    attempts: number;
}

/**
 * Store an OTP for an email
 */
export function storeOTP(email: string, otp: string, expiryMinutes: number = 10): void {
    const db = getDb();
    const expiresAt = Date.now() + expiryMinutes * 60 * 1000;

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO otp_codes (email, otp, expires_at, attempts)
        VALUES (?, ?, ?, 0)
    `);

    stmt.run(email.toLowerCase(), otp, expiresAt);

    // Cleanup expired OTPs (async, fire and forget)
    cleanupExpiredOTPs();
}

/**
 * Get OTP data for an email
 */
export function getOTP(email: string): OTPData | null {
    const db = getDb();

    const stmt = db.prepare(`
        SELECT otp, expires_at as expiresAt, attempts
        FROM otp_codes
        WHERE email = ?
    `);

    const row = stmt.get(email.toLowerCase()) as { otp: string; expiresAt: number; attempts: number } | undefined;

    if (!row) return null;

    return {
        otp: row.otp,
        expiresAt: row.expiresAt,
        attempts: row.attempts,
    };
}

/**
 * Increment attempt count for an email
 */
export function incrementAttempts(email: string): number {
    const db = getDb();

    const stmt = db.prepare(`
        UPDATE otp_codes
        SET attempts = attempts + 1
        WHERE email = ?
    `);

    stmt.run(email.toLowerCase());

    // Get new attempt count
    const row = db.prepare('SELECT attempts FROM otp_codes WHERE email = ?')
        .get(email.toLowerCase()) as { attempts: number } | undefined;

    return row?.attempts || 0;
}

/**
 * Delete OTP for an email (after successful verification)
 */
export function deleteOTP(email: string): void {
    const db = getDb();

    const stmt = db.prepare('DELETE FROM otp_codes WHERE email = ?');
    stmt.run(email.toLowerCase());
}

/**
 * Cleanup expired OTPs
 */
function cleanupExpiredOTPs(): void {
    try {
        const db = getDb();
        const stmt = db.prepare('DELETE FROM otp_codes WHERE expires_at < ?');
        stmt.run(Date.now());
    } catch (error) {
        console.error('Error cleaning up expired OTPs:', error);
    }
}

/**
 * Check if rate limited (last OTP request was too recent)
 */
export function isRateLimited(email: string, cooldownMs: number = 60000): boolean {
    const db = getDb();

    const stmt = db.prepare(`
        SELECT created_at
        FROM otp_codes
        WHERE email = ?
    `);

    const row = stmt.get(email.toLowerCase()) as { created_at: number } | undefined;

    if (!row) return false;

    // created_at is in seconds, convert to ms
    const createdAt = row.created_at * 1000;
    return Date.now() - createdAt < cooldownMs;
}
