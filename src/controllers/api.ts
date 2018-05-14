"use strict";

import async from "async";
import request from "request";
// import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";


/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.send({"test": "rest"});
};