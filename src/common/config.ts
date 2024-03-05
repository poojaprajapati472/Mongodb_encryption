import * as dotenv from 'dotenv'
export const APP_CONSTANTS = {
  DEV: 'dev',
  QA: 'qa',
  LOCAL: 'local',
}

export let appConfig = {
  env: {
    MONGODB_URL:process.env.MONGODB_URL,
    CUSTOMER_MASTER_KEY:process.env.CUSTOMER_MASTER_KEY,
     KEY_DATABASE:process.env.KEY_DATABASE,
    KEY_COLLECTION:process.env.KEY_COLLECTION,
    PORT:process.env.PORT,
    KEY_VAULT_NAME_SPACE:process.env.KEY_VAULT_NAME_SPACE,
  },
}
switch (process.env.NODE_ENV) {
  case 'local':
    dotenv.config({ path: '.env.local' })
    appConfig = {
      env: {
        MONGODB_URL:process.env.MONGODB_URL,
        CUSTOMER_MASTER_KEY:process.env.CUSTOMER_MASTER_KEY,
        KEY_DATABASE:process.env.KEY_DATABASE,
        KEY_COLLECTION:process.env.KEY_COLLECTION,
        PORT:process.env.PORT,
        KEY_VAULT_NAME_SPACE:process.env.KEY_VAULT_NAME_SPACE,
      },
    }
    break
  case 'qa':
    dotenv.config({ path: '.env.qa' })
    break
  default:
    dotenv.config({ path: '.env.dev' })
    break
}
export default appConfig;