
// const db = 'medicalRecords';
// const coll = 'patients';
// const namespace = `${db}.${coll}`;

// // start-schema
// const schema = {
//   bsonType: 'object',
//   encryptMetadata: {
//     keyId: '/key-id',
//   },
//   properties: {
//     insurance: {
//       bsonType: 'object',
//       properties: {
//         policyNumber: {
//           encrypt: {
//             bsonType: 'int',
//             algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
//           },
//         },
//       },
//     },
//     email: {
//       encrypt: {
//           bsonType: 'string',
//           algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
//       },
//     },
//     medicalRecords: {
//       encrypt: {
//         bsonType: 'array',
//         algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
//       },
//     },
//     bloodType: {
//       encrypt: {
//         bsonType: 'string',
//         algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
//       },
//     },
//     ssn: {
//       encrypt: {
//         bsonType: 'int',
//         algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
//       },
//     },
//   },
// };

// export const userSchema: Record<string, unknown> = {};
// userSchema[namespace] = schema;
// // end-schema