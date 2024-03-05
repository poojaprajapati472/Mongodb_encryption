import { MongoClient, MongoClientOptions } from 'mongodb';
import { userSchema } from '../schema/uuserschema';
import fs from 'fs';
import dotenv from "dotenv"
import { APP_STATIC } from '../constants/constant';
import { medSchema } from '../schema/medicineschema';
import appConfig from '../common/config';
import { createDataKey } from './keyVaultGen';
dotenv.config()
const localMasterKey = fs.readFileSync(appConfig.env.CUSTOMER_MASTER_KEY);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
const keyVaultNamespace = appConfig.env.KEY_VAULT_NAME_SPACE;

class AutoEncryptionMongo {
  private securedClient: MongoClient;
  private securedClient1:MongoClient;
  private unencryptedClient: MongoClient;
  constructor() {
    this.unencryptedClient = new MongoClient(appConfig.env.MONGODB_URL)
     this.connect()
  }
  public async connect(){
    const key = await this.getKey()
    const options: MongoClientOptions = {
      autoEncryption: {
        keyVaultNamespace,
        kmsProviders,
        schemaMap:userSchema(key),
      },
    };
    const medical_options: MongoClientOptions = {
      autoEncryption: {
        keyVaultNamespace,
        kmsProviders,
        schemaMap:medSchema(key)
      },
    };

    try {
       this.securedClient = new MongoClient(appConfig.env.MONGODB_URL, options);
       this.securedClient1=new MongoClient(appConfig.env.MONGODB_URL,medical_options)
       await this.securedClient.connect();
       await this.securedClient1.connect()
       console.log(APP_STATIC.MONGODB.CONNECTED)
    } catch (error) {
      console.error(APP_STATIC.MONGODB.NOT_CONNECTED, error);
      throw error;
    }
  }

  returnSecuredClient() {
    return this.securedClient.db(APP_STATIC.MONGODB.db).collection(APP_STATIC.MONGODB.coll)
  }
  returnsecured1Client() {
    return this.securedClient1.db(APP_STATIC.MONGODB.dbName).collection(APP_STATIC.MONGODB.collName)
  }
  
  public async getKey(): Promise<any> {
    await this.unencryptedClient.connect();
    const keyVaultCollection = this.unencryptedClient.db(appConfig.env.KEY_DATABASE).collection(appConfig.env.KEY_COLLECTION);
    let finalKey = await keyVaultCollection.find().toArray();
    if (finalKey.length) {
      console.log("key found")
      const id = finalKey[0]._id;
      const keyValue = id.toString();
      return keyValue
    }
    else
    {
      const key = await createDataKey()
      return key

    }
  }
}
export const autoEnc = new AutoEncryptionMongo()