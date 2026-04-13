/**
 * Mobile init hook for pre-cached models on Device Farm.
 *
 * When cache-models is enabled in CI, a models-manifest.json is pushed
 * to /data/local/tmp/ via adb. The consumer's bootstrap() reads it and
 * downloads models from S3 before SDK init, so the SDK skips its own
 * registry downloads.
 *
 * This file is intentionally minimal — all async download logic lives
 * in consumer.ts bootstrap() to avoid top-level-await limitations.
 *
 * Referenced from qvac-test.config.js as mobileInit.
 */

export const __sdkPreload = true;
