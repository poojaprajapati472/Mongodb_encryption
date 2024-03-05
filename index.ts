import express from "express";
import { router } from "./src/routes/user.route";
import { autoEnc } from "./src/database/conncetion";
import { createDataKey } from "./src/database/keyVaultGen";
import appConfig from "./src/common/config";
const port=appConfig.env.PORT
const app = express();
app.use(express.json()); 
app.use('/api1', router);


// createDataKey();
(async () => {
    try {
      autoEnc;
      app.listen(port, () => {
        console.log(`Server is running ${port}`);
      });
    } catch (error) {
      console.error(`Error during server start`);
      console.error(error);
    }
  })();





