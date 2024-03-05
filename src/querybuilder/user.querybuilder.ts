import { APP_STATIC, HttpStatusCode, STATUS_MSG } from "../constants/constant";
import { ResponseHandler } from "../responsehandler/responsehandler";
class QueryBuilder extends ResponseHandler {
    async insertDocument(coll: any, document: any): Promise<any> {
        try {
            // document['key-id']='demo-data-key';
            return await coll.insertOne(document);
        } catch (error) {
            console.error(APP_STATIC.DOCUMENT_ERROR.INSERTION, error);
            throw error;
        }
    }
    async findDocument(coll: any, filter: any, options?: any) {
        try {
            return await coll.findOne(filter, options);
        } catch (error) {
            console.error(APP_STATIC.DOCUMENT_ERROR.FIND, error);
            throw error;
        }
    }
    async findall(coll:any){
        try{
            // const pipeline = [
            //     // {
            //     //     $match:{}
            //     // },
            //     {
            //         $sort : {"xyz":-1}//doesn't work for encrypted field
            //     }
            // ]
            // return await coll.aggregate(pipeline).toArray()
            const result= await coll.find({},{ projection: { username: 1, email: 1 } }).toArray();
            return result;
        }
        catch(error){
            throw error;
        }
    }
    
}

export const queryBuilder = new QueryBuilder();
