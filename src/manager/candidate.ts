import express from "express";
const router = express();
import DbClient from "./DbClient";

router.get('/get', function(req, res) {
	console.log("req",req.body)
	console.log("req",req.query)
  
    DbClient.query({queryParams:{id:"58fde7a36983fb1e09f7010b"},tableName:"dealer"},(response : any)=>{
      res.send(response);
      console.log(response)
    }); 
    
})
 

export default router;