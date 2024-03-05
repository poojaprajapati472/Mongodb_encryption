import { NextFunction } from "express";
import { APP_STATIC, HttpStatusCode, STATUS_MSG } from "../constants/constant";
import { Request, Response } from "express";
import { queryBuilder } from "../querybuilder/user.querybuilder";
import { autoEnc } from "../database/conncetion";
import { medSchema } from "../joi/joi";
import { ResponseHandler } from "../responsehandler/responsehandler";
class medcontroller extends ResponseHandler{
    medentry = async (req: Request, res: Response,next:NextFunction) => {
        try{
            this.validateAndInsertData(req, res);
            const coll = autoEnc.returnsecured1Client()
            const data = req.body;
            const result =  await queryBuilder.insertDocument(coll, data);
            this.sendResponse(
                res,
                HttpStatusCode.Ok,
                true,
                STATUS_MSG.SUCCESS.message,
                result,
              );
        }
        catch(error){
                this.sendErrorResponse(
                res,
                HttpStatusCode.BadRequest,
                error?.message,
                error?.errors,
              );
        }
    }
    private async validateAndInsertData(req: Request, res: Response) {
        const validationResult = medSchema.validate(req.body);
        if (validationResult.error) {
            res.status(HttpStatusCode.BadRequest).send(validationResult.error.message);
            return;
        }
    }
}
export const getData1=new medcontroller();