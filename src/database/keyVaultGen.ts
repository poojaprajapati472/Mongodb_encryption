import * as fs from "fs";
import * as crypto from "crypto";
import { MongoClient, ClientEncryption } from "mongodb";
import appConfig from "../common/config";
import { APP_STATIC } from "../constants/constant";

async function getCredentials() {
  return {
    MONGODB_URI: appConfig.env.MONGODB_URL,
  };
}

async function createLocalMasterKey() {
  const path = appConfig.env.CUSTOMER_MASTER_KEY;

  try {
    const mkey = fs.readFileSync(path);
    if (!mkey) {
      fs.writeFileSync(path, crypto.randomBytes(96));
      console.log(APP_STATIC.SUCCESS.MASTER_KEY_CREATED);
    }
  } catch (err) {
    console.error(APP_STATIC.ERROR.ERROR_CREATING_MASTER_KEY, err);
  }

  return path;
}


export async function createDataKey() {
  const credentials = await getCredentials();
  const localMasterKeyPath = await createLocalMasterKey();
  const keyVaultClient = new MongoClient(credentials.MONGODB_URI);
  try {
    await keyVaultClient.connect();
    const keyVaultDB = keyVaultClient.db(appConfig.env.KEY_DATABASE);
    const keyVaultColl = keyVaultDB.collection(appConfig.env.KEY_COLLECTION);

    await keyVaultColl.createIndex(
      { keyAltNames: 1 },
      {
        unique: true,
        partialFilterExpression: { keyAltNames: { $exists: true } },
      }
    );

    const localMasterKey = fs.readFileSync(localMasterKeyPath);
    const kmsProviders = {
      local: {
        key: localMasterKey,
      },
    };

    const encryption = new ClientEncryption(keyVaultClient, {
      keyVaultNamespace: appConfig.env.KEY_VAULT_NAME_SPACE,
      kmsProviders,
    });

    const provider = "local";
    const keyAltNames = ["demo-data-key"];//unique index created
    const key = await encryption.createDataKey(provider, { keyAltNames });
    // console.log("DataKeyId [base64]:", key.toString("base64"));
    return (key.toString())
  } finally {
    await keyVaultClient.close();

  }
}