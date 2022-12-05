const xlsx = require("xlsx");
const fs = require("fs");
const file1 = "./real_list.csv";
const file2 = "../output/db_data.txt";
const file3 = "./copy_GenomeReport2021_Info.csv";
const file4 = "./copy_GenomeReport2021_Info2.csv";
const file5 = "./report_give_20220111.xlsx";
const file6 = "./lookup_db_it_share_20220307.xlsx";

const mysql = require("mysql");
const conn1 = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});
const conn2 = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});
const conn3 = mysql.createConnection({
  // host:'localhost',
  host: "",
  user: "",
  password: "",
  database: "",
});

var sql = `INSERT INTO report_member(u_reportId,u_birth,u_sex,u_id) values`;

// main();
function main() {
  const json = readXlsx(file5);
  console.log(json);
}

function readXlsx(fileName) {
  const excelFile = xlsx.readFile(fileName);
  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

  return jsonData;
}

function extractInfo(data) {
  let sql =
    "INSERT INTO report_member(`u_id`,`u_reportId`,`u_sex`,`u_birth`) VALUES ";
  for (var el of data) {
    let sex = 2;
    if (el.u_sex == "남자") {
      sex = 1;
    }
    if (el.product == "X") {
      continue;
    }
    sql +=
      "('" +
      el.u_id +
      "', '" +
      el.u_reportId +
      "', " +
      sex +
      ", '" +
      el.u_birth +
      "'),";
  }
  sql = sql.slice(0, sql.length - 1);
  // console.log(sql);
  return sql;
}

function insertReportMemberDB(sql) {
  conn1.query(sql, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
}

function readFile(arr) {
  const row = arr.split("\n");
  let i = 0;
  const tmp = new Array();
  for (let el of row) {
    const part = el.split(",");
    if (part[5] != null && part[5].replace("\r", "") == "O") {
      let sex = 1;
      if (part[3] == "여자") {
        sex = 2;
      }
      tmp.push({
        u_reportId: part[1],
        u_birth: part[2],
        u_sex: sex,
        u_id: part[4],
      });
    }
  }
  return tmp;
}

function readDB(fileData) {
  const sql = "SELECT * FROM report_member";
  const tmp = new Array();
  conn2.query(sql, (err, res) => {
    if (err) throw err;
    let txt = "u_reportId\tu_birth\tu_sex\tu_id\n";
    let result = "u_reportId(DB)\tu_reportID(file)\tresult\n";
    for (let el of res) {
      for (let item of fileData) {
        if (el.u_reportId == item.u_reportId) {
          result = el.u_reportId + "\t" + item.u_reportId + "\tO\n";
        }
      }
      txt +=
        el.u_reportId +
        "\t" +
        el.u_birth +
        "\t" +
        el.u_sex +
        "\t" +
        el.u_id +
        "\n";
      // tmp.push({u_reportId:el.u_reportId,u_birth:el.u_birth,u_sex:el.u_sex,u_id:el.u_id})
    }
    fs.writeFile("../output/result.txt", result, "utf-8", (err) => {
      if (err) throw err;
      console.log("done");
    });
    fs.writeFile("../output/db_data.txt", txt, "utf-8", (err) => {
      if (err) throw err;
      console.log("done2");
    });
  });
}

function compare(fileData) {
  const selectData = fs.readFileSync(file2, "utf-8");
  const row = selectData.split("\n");
  const tmp = new Array();
  let cnt = 0;
  let txt = "DB u_reportID\tlist u_reportID\tresult\n";
  for (let el of row) {
    const part = el.split("\t");
    for (let item of fileData) {
      if (item.u_reportId == part[0]) {
        txt += part[0] + "\t" + item.u_reportId + "\tO\n";
        cnt += 1;
      }
    }
  }
  txt += "total = " + cnt;
  fs.writeFile("../output/result.txt", txt, "utf-8", (err, res) => {
    if (err) throw err;
    console.log("done");
  });
}

function insertMemo(fileData) {
  let sql = "UPDATE report_member SET u_memo= '202201' WHERE ";
  for (let el of fileData) {
    sql += " u_reportId ='" + el.u_reportId + "' or";
  }
  sql = sql.slice(0, sql.length - 2);
  // console.log(sql);
  conn2.query(sql, (err, res) => {
    if (err) throw err;
  });
}

function decollateData(data2) {
  const row = data2.split("\n");
  let i = 0;
  const tmp = new Array();
  let txt = "";
  for (let el of row) {
    const part = el.split(",");
    if (part[2] == "고유번호") {
      continue;
    }
    txt += part[2] + "\n";
    tmp.push({ u_reportId: part[2] });
    i += 1;
  }
  // fs.writeFile('../output/samba_file_ku10k.txt',txt,'utf-8',(err,res)=>{
  //     if(err)throw err;
  //     console.log('done');
  // })
  return tmp;
}

function analyzeDB(fileData2, fileData1) {
  const sql = "SELECT * FROM report_member";
  conn2.query(sql, (err, res) => {
    if (err) throw err;
    let txt = "DB\tlist\treal_list\ttag\n";
    for (let el of res) {
      let cnt = 0;
      for (let item of fileData2) {
        if (el.u_reportId == item.u_reportId) {
          for (let i of fileData1) {
            if (item.u_reportId == i.u_reportId) {
              txt +=
                el.u_reportId +
                "\t" +
                item.u_reportId +
                "\t" +
                i.u_reportId +
                "\t2022\n";
              cnt = 1;
              break;
            }
          }
          if (cnt == 0) {
            txt += el.u_reportId + "\t" + item.u_reportId + "\tsamba\t2022\n";
            cnt = 2;
            break;
          }
        }
      }
      if (cnt == 0) {
        txt += el.u_reportId + "\t \t2022이전\n";
      }
    }
    fs.writeFile("../output/db_list.txt", txt, "utf-8", (err, res) => {
      console.log("done");
    });
  });
}

function compareFile(file1, file2) {
  let txt = "삼바 파일\t검수 파일\t일치 결과\n";
  const tmp = new Array();
  let sql = "DELETE FROM report_member WHERE";
  for (let el of file1) {
    let cnt = 0;
    for (let el2 of file2) {
      if (el.u_reportId == el2.u_reportId) {
        txt += el.u_reportId + "\t" + el2.u_reportId + "\tO\n";
        cnt = 1;
      }
    }
    if (cnt == 0) {
      tmp.push({ u_reportId: el.u_reportId });
      sql += " u_reportId = '" + el.u_reportId + "' or";
      txt += el.u_reportId + "\t \tX\n";
    }
  }
  sql = sql.slice(0, sql.length - 2);
  console.log(sql);
  conn2.query(sql, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
  // fs.writeFile('../output/compareAtoB.txt',txt,'utf-8',(err,res)=>{
  //     console.log('done');
  // })
}
