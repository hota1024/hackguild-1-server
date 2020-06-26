import * as dotenv from 'dotenv'

dotenv.config()

/*
 * Environment configuration.
 */
export type EnvConfig = {
  /**
   * Application server port.
   */
  APP_PORT: number

  /**
   * Database host.
   */
  DB_HOST: string

  /**
   * Database port.
   */
  DB_PORT: number

  /**
   * Database user.
   */
  DB_USER: string

  /**
   * Database password.
   */
  DB_PASSWORD: string

  /**
   * Database name.
   */
  DB_NAME: string

  /**
   * JWT secret key.
   */
  JWT_SECRET: string
}

/**
 * Returns parsed configuration value.
 *
 * @param key Key.
 */
export const getConfig = <K extends keyof EnvConfig>(key: K): EnvConfig[K] => {
  const value = process.env[key]
  const numberValue = parseInt(value)

  if (Number.isNaN(numberValue)) {
    return value as EnvConfig[K]
  }

  return numberValue as EnvConfig[K]
}