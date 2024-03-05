import { NextFunction } from "express";
import { APP_STATIC, HttpStatusCode, STATUS_MSG } from "../constants/constant";
import { Request, Response } from "express";
import { queryBuilder } from "../querybuilder/user.querybuilder";
import { autoEnc } from "../database/conncetion";
import { User } from "../interfaces/user_interface";
import { ResponseHandler } from "../responsehandler/responsehandler";
import { profile, signupSchema } from "../joi/joi";
class usercontroller extends ResponseHandler{
    signup = async (req: Request, res: Response,next:NextFunction) => {
        try{
            this.validateAndInsertData(req,res);
            const coll = autoEnc.returnSecuredClient()
            const data:User= req.body;
            const emailExist = await queryBuilder.findDocument(coll, { email: data.email });
            if (emailExist) {
                res.status(HttpStatusCode.Conflict).send(STATUS_MSG.ERROR.CONFLICT)
            }
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
    userprofile=async(req:Request,res: Response,next:NextFunction)=>{
        try{
            this.validate_email(req,res);
            const coll = autoEnc.returnSecuredClient()
            const data =req.body;
            const result=await queryBuilder.findDocument(coll,{email:data.email})
            if(!result)
            {
                res.status(HttpStatusCode.NotFound).send(STATUS_MSG.ERROR.NOT_FOUND)
            }
            else{
            this.sendResponse(
                res,
                HttpStatusCode.Ok,
                true,
                STATUS_MSG.SUCCESS.message,
                result,
              );
            }
        }
        catch(error){
            this.sendErrorResponse(
                res,
                HttpStatusCode.NotFound,
                error?.message,
                error?.errors,
              );
        }
    }
    findall=async(req:Request,res:Response,next:NextFunction)=>{
        try{
        const coll=autoEnc.returnSecuredClient()
        const result = await queryBuilder.findall(coll);
        if(!result || !result.length)
            {
                res.status(HttpStatusCode.NotFound).send(STATUS_MSG.ERROR.NOT_FOUND)
            }
            else{
                this.sendResponse(
                    res,
                    HttpStatusCode.Ok,
                    true,
                    STATUS_MSG.SUCCESS.message,
                    result,
                  );
            }
        }
        catch(error){
            this.sendErrorResponse(
                res,
                HttpStatusCode.NotFound,
                error?.message,
                error?.errors,
              );
        }
    }
    private async validateAndInsertData(req: Request, res: Response) {
        const validationResult = signupSchema.validate(req.body);
        if (validationResult.error) {
            res.status(HttpStatusCode.BadRequest).send(validationResult.error.message);
            return;
        }
    }
    private async validate_email(req: Request, res: Response) {
        const validationResult = profile.validate(req.body);
        if (validationResult.error) {
            res.status(HttpStatusCode.BadRequest).send(validationResult.error.message);
            return;
        }
    }
}
export const getData=new usercontroller();