const xlsx = require("xlsx");
const fs = require("fs");
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
  host: "",
  user: "",
  password: "",
  database: "",
});

const conn4 = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

main();

function main() {
  const json = readXlsx("./genome_donation_list.xlsx");
  insertDonationList(json);
}

function insertDonationList(data) {
  var sql = "INSERT INTO genome_donation_list(u_id,u_name,u_hp,u_year) VALUES ";
  for (var el of data) {
    sql += `(${el.리포트ID},'${el.이름}','${el.연락처}','${el.참여년도}'),`;
  }
  sql = sql.slice(0, sql.length - 1);
  conn4.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

function readXlsx(fileName) {
  const excelFile = xlsx.readFile(fileName);
  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" });

  return jsonData;
}
function writeFile(data) {
  var sql = "SELECT * FROM 10kG_member_update";
  var txt = "mb_name\tmb_birthday\tmb_hp\treportID\n";
  conn1.query(sql, (err, result) => {
    if (err) throw err;
    for (var el of result) {
      txt +=
        el.mb_name +
        "\t" +
        el.mb_birthday +
        "\t" +
        el.mb_hp +
        "\t" +
        el.reportID +
        "\n";
    }
    fs.writeFile("../output/update_member.txt", txt, "utf-8", (err) => {
      if (err) throw err;
      console.log("done");
    });
  });
}

function insertQuestion() {
  const res = fs.readFileSync("./new_question.txt", "utf-8");
  const line = res.split("\r\n");
  var sql =
    "INSERT INTO survey_question(id,sub_id,s_idx,ca_id,group_no,question,question_en,question_type,ans_count,ans_type) VALUES";
  for (var l of line) {
    const part = l.split("\t");
    if (part[0] != "id") {
      sql += "(";
      for (var p of part) {
        if (p == "") {
          sql += "NULL,";
        } else {
          sql += p + ",";
        }
      }
      sql = sql.slice(0, sql.length - 1);
      sql += "),";
    }
  }
  sql = sql.slice(0, sql.length - 1);
  // console.log(sql);
  conn2.query(sql, (err, res) => {
    if (err) throw err;
    else {
      console.log(res);
    }
  });
}
function insertAnswer() {
  const res = fs.readFileSync("./new_answer_8_and_9.txt", "utf-8");
  const line = res.split("\r\n");
  var sql = `INSERT INTO survey_answer(sa_parent_id,sa_id,sa_sub_id,sa_child_id,sa_content,sa_content_en,sa_tag,s_idx) VALUES`;
  var cnt = 0;
  for (var i in line) {
    cnt += 1;
    sql += `(9,${cnt},${0},${1},'${cnt}. ${line[i]}',NULL,'A${cnt}',202202),`;
  }
  sql = sql.slice(0, sql.length - 1);
  // console.log(sql);
  conn2.query(sql, (err, res) => {
    if (err) throw err;
    else {
      console.log(res);
    }
  });
}
