import { MongoClient, ObjectID } from "mongodb";
const mongoUrl = "mongodb://10.1.1.224/almdb";
const mongoName = "almdb";
class DbClient {
    dbConnection: any = undefined;

    public connect(callback: any) {
        if (this.dbConnection == undefined) {
            MongoClient.connect(mongoUrl, (err, client) => {
                if (!err) {
                    const db = client.db("almdb");
                    this.dbConnection = db;
                    callback({ status: 200, db: db });
                    console.log("Connected already");
                } else {
                    this.dbConnection = undefined;
                    callback({ status: 500, msg: "Error happened connecting to db:::: ", err });
                }
            });
        }else{
            callback({ status: 200, db: this.dbConnection });
        }
    }



    public query(data: any, callback: any) {
        console.log("Checkconnections", data);
        this.connect((response: any) => {
            if (response.status == 200) {
                const dataList: Object[] = [];
                if (data.options == undefined) {
                    data.options = {};
                }
                if (data.queryParams.id) {
                    data.queryParams._id = new ObjectID(data.queryParams.id);
                    delete data.queryParams.id;
                }

                const db = response.db;
                const cursor = db.collection(data.tableName).find(data.queryParams, data.options);
                cursor.each(function (err: any, doc: any) {
                    // console.log(doc)
                    if (doc != undefined) {
                        dataList.push(doc);
                    } else {
                        callback({ status: 200, data: dataList });
                    }
                });

            } else {
                callback(response);
            }
        });
    }
}

export = new DbClient();