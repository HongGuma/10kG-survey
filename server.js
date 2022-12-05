/**
*@title 서버 메인
*@date 2021-12-20
*@author 홍수희
*@desc
*@etc(change)
*/

const app = require('./index.js');
const db = require('./DBconn.js'); //db 호출
const header = "Access-Control-Allow-Origin";

const routes = require('./routes/index.js');
app.use('/api',routes);