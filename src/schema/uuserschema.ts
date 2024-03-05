import { BSON } from 'mongodb';
import { User } from '../interfaces/user_interface';
export function userSchema(key: any):User{
    try {
        const dbName = 'medicalRecords';
        const collName = 'patients';
        const userSchemaMap :any= {
            [`${dbName}.${collName}`]: {
                bsonType: 'object',
                encryptMetadata: {
                //no need to pass the key in request
                 keyId: [new BSON.UUID(key)],
                },
                properties: {
                    name: {
                        encrypt: {
                            bsonType: 'string',
                            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                        },
                    },
                    email: {
                        encrypt: {
                            bsonType: 'string',
                            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                        },
                    },
                    password: {
                        encrypt: {
                            bsonType: 'string',
                            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                        },
                    },
                    phoneNo: {
                        encrypt: {
                            bsonType: 'string',
                            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                        },
                    },
                    username: {
                        encrypt: {
                            bsonType: 'string',
                            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                        },
                    },
                    subscriptionDetail: {
                        bsonType: 'object',
                        properties: {
                            subscriptionId: {
                                encrypt: {
                                    bsonType: 'string',
                                    algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                                },
                            },
                            subscriptionName: {
                                encrypt: {
                                    bsonType: 'string',
                                    algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                                },
                            },
                        },
                    },
                },
            },
        };

        return userSchemaMap;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

