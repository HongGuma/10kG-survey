/**
 *@title router index
 *@date 2021-12-21
 *@author 홍수희
 *@desc route 모아놓은 파일
 *@etc(change)
 */
const express = require("express");
const router = express.Router();

const data = require("./data.js");

router.use("/data", data);

module.exports = router;
