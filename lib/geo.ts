/**
 * Geo-detection utility for Next.js / Vercel.
 *
 * Vercel automatically injects the visitor's ISO 3166-1 alpha-2 country code
 * into the `x-vercel-ip-country` request header at the edge — zero latency,
 * no external API, GDPR-safe.
 *
 * On local development the header is absent, so we default to 'IN' (India)
 * to preserve the existing INR pricing experience during local testing.
 *
 * Usage (Server Component / Route Handler):
 *   import { headers } from 'next/headers';
 *   import { isInternationalUser } from '@/lib/geo';
 *   const isIntl = isInternationalUser(await headers());
 */

/**
 * Returns the visitor's ISO 3166-1 alpha-2 country code.
 * Falls back to 'IN' when the header is not present (local dev).
 */
export function getCountryCode(headersList: Headers): string {
    return headersList.get('x-vercel-ip-country') ?? 'IN';
}

/**
 * Returns `true` when the visitor is outside India.
 * Used to switch between INR and USD pricing on certificate pages.
 */
export function isInternationalUser(headersList: Headers): boolean {
    return getCountryCode(headersList) !== 'IN';
}
