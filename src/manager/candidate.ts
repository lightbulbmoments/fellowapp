import express from "express";
const router = express();
import DbClient from "./DbClient";
import async from "async";

router.get("/get", function (req, res) {

  if (!req.query.id) {
    res.status(500)
    res.send({ status: 500, data: "Invalid request" });
    return;
  }

  let sharedData: any = {};
  async.waterfall([getUser],
    function (response: any) {
      res.status(response.status);
      res.send(response);
    });

  function getUser(callback: any) {
    DbClient.query({ queryParams: {}, tableName: "users" }, (response: any) => {
      if (response.status == 200 && response.data.length) {
        sharedData.users = {};
        for (let key in response.data[0]) {
          console.log(key)
          console.log(req.query.id)
            if(req.query.id == key){
              sharedData.users = {
                invited_jobs:response.data[0][key].invited_jobs,
                created_jobs:response.data[0][key].created_jobs,
              }
            }
        }
        callback({ status: 200, data: sharedData.users })
      } else {
        callback({ status: 500, data: "No record found" })
      }
    });
  }
});

export default router;

