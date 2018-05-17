import {MongoClient,ObjectID} from "mongodb";
const url = "mongodb://88.99.187.156:27019/alpinacom";
class DbClient {
    dbConnection: any = undefined;
    public connect(callback:any) {
     if (this.dbConnection == undefined) {
            MongoClient.connect(url, (err, client) => {
                if (!err) {
                    const db = client.db('alpinacom');
                    this.dbConnection = db;
                    callback({ status: 200, db: db });
                    console.log("Connected already");
                } else {
                    this.dbConnection = undefined;
                    callback({status:500,msg:"Error happened connecting to db:::: " + url})
                }
            });
        }
    }
    
    

     public query(data:any,callback:any){
        console.log("Checkconnections",data);
         this.connect((response:any)=>{
            if(response.status == 200){
                console.log(response)
                let dataList :Object[] = [];
                if (data.options == undefined) {
                    data.options = {};
                }
                if (data.queryParams.id) {
                    data.queryParams._id = new ObjectID(data.queryParams.id);
                    delete data.queryParams.id;
                }

                var db = response.db;
                var cursor = db.collection(data.tableName).find(data.queryParams, data.options);
                    cursor.each(function(err:any, doc:any) {
                        if (doc != null) {
                            dataList.push(doc);
                        } else {
                            callback({ status: 200, data: dataList });
                        }
                    });

            }else{
                callback(response)
            }
         });
    };


};

export = new DbClient();