export const APP_STATIC={
     ERROR:{
        USER_ERROR:'user not found',
        AUTHENTICATION_ERROR:'An error occurred during authentication',
        REGISTRATION_ERROR:'An error while registering the user',
        SERVER_ERROR:'internal server error',
        ERROR_CREATING_MASTER_KEY:'Error creating local master key:'
    },
    SUCCESS:{
        AUTHENTICATION_SUCCES:'Authentication successful',
        REGISTRATION_SUCCES:'User registered successfully',
        MASTER_KEY_CREATED:'Local master key created successfully.'

    },
    KEYS:{
        FOUND:'key found in keyvault',
        NOT_FOUND:'no key found in key vault'
    },
    MONGODB:{
        CONNECTED:'connected to mongodb',
        NOT_CONNECTED:'not connected to mongodb',
        dbName:'medicineRecords',
        collName : 'medicine',
        db : 'medicalRecords',
        coll :'patients',
    },
    USER:{
        USER_PROFILE:'user profile fetched'
    },
    DOCUMENT_ERROR:{
        INSERTION:"ERROR inserting document",
        FIND:"error finding document "
    }
}
export enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    ImUsed = 226,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
  }
  export const STATUS_MSG = {
    ERROR: {
      BAD_REQUEST(message: string) {
        return {
          statusCode: 400,
          success: false,
          message: message,
          type: 'BAD_REQUEST',
        };
      },
  
      ERROR_OCCURED: {
        statusCode: 400,
        success: false,
        message: 'error occured',
      },
      NOT_FOUND: {
        statusCode: 404,
        success: false,
        message: 'not found',
      },
     CONFLICT: {
        statusCode: 409,
        success: false,
        message: 'already exists ',
      },
  
      UNAUTHORIZED: {
        statusCode: 401,
        success: false,
        message: 'You are not authorized to perform this action',
        type: 'UNAUTHORIZED',
      },
    },
  
    SUCCESS: {
      statusCode: 200,
      success: true,
      message: 'Success',
    },
  
    SUCCESS_WITH_MESSAGE(message: string) {
      return {
        statusCode: 200,
        success: true,
        message: message,
        type: 'Success',
      };
    },
  };