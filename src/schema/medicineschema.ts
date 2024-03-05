import { BSON } from 'mongodb';
export function medSchema(key: any){
    try {
        const dbName = 'medicineRecords';
        const collName = 'medicine';
        const encryptionConfig = {
            bsonType: 'string',
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
        };
        const medSchemaMap:any = {
            [`${dbName}.${collName}`]: {
                bsonType: 'object',
                encryptMetadata: {
                    keyId: [new BSON.UUID(key)],
                },
                properties: {
                    name: {
                        encrypt:encryptionConfig
                    },
                    description: {
                        encrypt: encryptionConfig
                    },
                    date_of_packaging: {
                        encrypt: encryptionConfig
                    },
                },
            },
        };

        return medSchemaMap;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

