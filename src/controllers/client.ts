import express from "express";
const router = express();
import DbClient from "../manager/DbClient";
import async from "async";

router.get("/get", function (req, res) {

  if (!req.query.id) {
    res.status(500)
    res.send({ status: 500, data: "Invalid request" });
    return;
  }

  let sharedData: any = {};
  async.waterfall([getClient],
    function (response: any) {
      res.status(response.status);
      res.send(response);
    });

  function getClient(callback: any) {
    DbClient.query({ queryParams: {}, tableName: "client" }, (response: any) => {
      if (response.status == 200 && response.data.length) {
        sharedData.users = {};
       
        callback({ status: 200, data: sharedData.users })
      } else {
        callback({ status: 500, data: "No record found" })
      }
    });
  }
});

export default router;

