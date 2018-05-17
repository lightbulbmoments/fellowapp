import errorHandler from "errorhandler";

import app from "./app";
import candidate from "./controllers/candidate";
import client from "./controllers/client";

import DbClient from "./manager/DbClient";
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());


/*API Router config*/
app.use("/candidate", candidate);
app.use("/client", client);

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );

  /*Check DB connection*/
  DbClient.connect((response: any) => {
    console.log("Databace connections-----", response);
  });
  console.log("  Press CTRL-C to stop\n");
});

export default server;
