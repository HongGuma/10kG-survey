const surveyDB = require("../dbInfo2.js");

const mysql = require("mysql");

const serverDB = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

const reportDBTEST = mysql.createConnection({
  host: "",
  password: "",
  user: "",
  database: "",
});

const reportDB = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

const express = require("express");
const route = express.Router();
const fs = require("fs");
const xlsx = require("xlsx");
const pool = require("../DBpool.js");
const ver3_0 = "./healthy_lifestyle_questionaire_note_20211125_v3.0.xlsx";
const ver3_1 = "./healthy_lifestyle_questionaire_note_20211125_v3.1.xlsx";
const fileName = "./GenomeReport2021_Clinical.xlsx";
const question = new Array();
const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const regDate =
  year +
  month +
  day +
  today.getHours().toString() +
  today.getMinutes().toString() +
  today.get;
Seconds().toString();

main();

async function main() {
  const sheet7 = readXlsx(fileName, 6);
  const sheet8 = readXlsx(fileName, 7);
  updateValue(sheet7);
  updateValue(sheet8);
}

function updateValue(jsonData) {
  var sql = "INSERT INTO report_member (u_id,u_reportId,u_sex,u_birth) VALUES ";
  var value = "";
  for (var el of jsonData) {
    if (el.성별 == "여자") {
      value += `('${el.리포트ID}','${el.고유번호}',2,'${el.생년월일}'),`;
    } else {
      value += `('${el.리포트ID}','${el.고유번호}',1,'${el.생년월일}'),`;
    }
  }

  value = value.slice(0, value.length - 1);
  reportDB.query(sql + value, (err, res) => {
    if (err) throw err;
    else {
      console.log(res);
    }
  });
}

//파일 읽기
function readXlsx(fileName, sheet) {
  const excelFile = xlsx.readFile(fileName);
  const sheetName = excelFile.SheetNames[sheet];
  const firstSheet = excelFile.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" });
  return jsonData;
}

//카테고리 추출
function extractCategory(data) {
  let arr = new Array();
  let category = new Array();
  for (let i in data) {
    if (i > 0) {
      //중복 제거
      if (data[i].Category_KOR == data[i - 1].Category_KOR) {
        continue;
      }
    }
    arr.push({
      ca_id: i,
      ca_name: data[i].Category_KOR,
      ca_name_en: data[i].Category_ENG,
    });
  }

  //결과 확인용
  let txt = "";
  for (let j in arr) {
    let seq = parseInt(j) + 1;
    txt +=
      j +
      "\t201901\t" +
      arr[j].ca_name +
      "\t" +
      arr[j].ca_name_en +
      "\t" +
      0 +
      "\t" +
      seq +
      "\t" +
      0 +
      "\t" +
      r;
    egDate + "\tY\n";
    category.push({
      ca_id: j,
      ca_name: arr[j].ca_name,
      ca_name_en: arr[j].ca_name_en,
      ca_depth: 0,
      ca_seq: seq,
      ca_parent: 0,
      ca_reg_dt: regDate,
      ca_use_yn: "Y",
    });
  }

  return category;
}

//질문 추출
function extractQuestion(data, category) {
  let arr = new Array();
  let question = new Array();
  for (let i in data) {
    //질문 태그에서 숫자만 추출 -> db에서 id로 사용
    const part = data[i].Question_tag.split("_");
    const tag = part[0].slice(1, part[0].length);
    if (i > 0) {
      //중복 제거
      if (data[i].Question_text_KOR == data[i - 1].Question_text_KOR) {
        continue;
      }
    }

    arr.push({
      id: tag,
      question: data[i].Question_text_KOR,
      question_en: data[i].Question_text_ENG,
      ca: data[i].Category_KOR,
    });
  }

  //결과 확인용
  let txt = "";
  let sub_id = 0;
  let ca_id;

  for (let j in arr) {
    if (j > 0) {
      //sub_id 추출, participant id는 sub_id 0
      if (
        arr[j].id == arr[j - 1].id &&
        arr[j].question_en != "[[Participant id]]"
      ) {
        sub_id += 1;
      } else {
        sub_id = null;
      }
    }

    //ca_id 추출
    for (let el of category) {
      if (el.ca_name == arr[j].ca) {
        ca_id = el.ca_id;
        break;
      }
    }

    q_text = arr[j].question.replace(/[\[\]]/g, "");
    q_text_en = arr[j].question_en.replace(/[\[\]]/g, "");
    txt +=
      j +
      "\t" +
      arr[j].id +
      "\t" +
      sub_id +
      "\t201901\t" +
      ca_id +
      "\t0\t" +
      q_text.replace(/\d{1,3}./, "") +
      "\t" +
      q_text_en.replace(/\d{1,3}./, "") +
      "\n";
    question.push({
      id: arr[j].id,
      sub_id: sub_id,
      s_idx: "201901",
      ca_id: ca_id,
      group_no: null,
      question: q_text.replace(/\d{1,3}./, ""),
      question_en: q_text_en.replace(/\d{1,3}./, ""),
      question_type: null,
      ans_count: 0,
      ans_type: null,
      file_list: null,
      reg_date: regDate,
      mod_dt: null,
    });
  }
  // 출력 확인용
  // fs.writeFile('../output/question.txt',txt,'utf-8',err => {
  //     if(err) throw err;
  //     else{console.log('extractQuestion:done');}
  // })

  return question;
}

//추출후 db에 저장
function insertQuestion(question) {
  sql =
    "INSERT INTO `Kogic_Survey`.`survey_question` (`id`,`sub_id`,`s_idx`,`ca_id`,`group_no`,    `question`,`question_en`,`question_type`,`ans_count`,`ans_type`,`file_list`,`reg_dt`,`mod_dt`) VAL    UES";

  for (let el of question) {
    sql +=
      "(" +
      el.id +
      "," +
      el.sub_id +
      ",'" +
      el.s_idx +
      "'," +
      el.ca_id +
      "," +
      null +
      ',"' +
      el.question +
      '","' +
      el.question_en +
      '",' +
      null +
      "," +
      0 +
      "," +
      null +
      "," +
      null +
      ",'" +
      el.reg_date +
      "'" +
      "," +
      null +
      "),";
  }

  sql = sql.substring(0, sql.length - 1);
  // console.log(sql);
  // test = "SELECT * FROM survey_question LIMIT 1";

  surveyDB.query(sql, (err, res) => {
    if (err) throw err;
    else {
      console.log(res);
    }
  });
}

//답변 추출
function extractAnswer(data) {
  const arr = new Array();
  const answer = new Array();
  let saID = 1;

  for (let i in data) {
    let saSubId = 0;
    let saChildId = 0;

    //answer_tag에서 A숫자 만 추출하기
    const part = data[i].Answer_tag.split("_");
    const saTag = part[0];

    //어느 질문의 답변인지 (질문 번호)
    const parentId = data[i].Question_tag.replace(/[^0-9]/g, "");
    if (parentId == 0) {
      continue;
    }

    //답변 번호
    if (
      data[i].Question_tag.replace(/[^0-9]/g, "") ==
      data[i - 1].Question_tag.replace(/[^0-9]/g, "")
    ) {
      saID += 1;
    } else {
      saID = 1;
      if (saTag == "A0") {
        saID = 0;
      }
    }

    // 답변 서브 번호 (1-2. 에서 2에 해당)
    if (saTag.indexOf("-") == 2) {
      const part2 = saTag.split("-");
      saSubId = parseInt(part2[1]);

      // 답변 서브 자식 번호 (1-2-3. 에서 3에 해당)
      if (part2.length > 2) {
        saChildId = parseInt(part2[2]);
      }
    }

    const saContent = data[i].Answer_text_KOR.replace(/[\[\]]/g, "");
    const saContentEn = data[i].Answer_text_ENG.replace(/[\[\]]/g, "");
    arr.push({
      sa_pa_id: parentId,
      sa_id: saID,
      sa_sub_id: saSubId,
      sa_child_id: saChildId,
      sa_content: saContent,
      sa_content_en: saContentEn,
      sa_tag: saTag,
    });
  }

  let txt = "";
  for (let j in arr) {
    txt +=
      arr[j].sa_pa_id +
      "\t" +
      arr[j].sa_id +
      "\t" +
      arr[j].sa_sub_id +
      "\t" +
      arr[j].sa_child_id +
      "\t    " +
      arr[j].sa_content +
      "\t" +
      arr[j].sa_content_en +
      "\t" +
      arr[j].sa_tag +
      "\t201901\t" +
      null +
      "\t" +
      regDate +
      "    t" +
      null +
      "\n";
    answer.push({
      sa_pa_id: arr[j].sa_pa_id,
      sa_id: arr[j].sa_id,
      sa_sub_id: arr[j].sa_sub_id,
      sa_child_id: arr[j].sa_child_id,
      sa_content: arr[j].sa_content,
      sa_content_en: arr[j].sa_content_en,
      sa_tag: arr[j].sa_tag,
      s_idx: 1901,
      sa_type: null,
      sa_reg_dt: regDate,
      sa_mod_dt: null,
    });
  }
  //출력 확인용
  // fs.writeFile('../output/answer.txt',txt,'utf-8',err=>{
  //     if(err) throw err;
  //     else{console.log('extractAnswer: done')};
  // })

  return answer;
}

function insertAnswer(answer) {
  sql =
    "INSERT INTO `Kogic_Survey`.`survey_answer` (`sa_parent_id`, `sa_id`, `sa_sub_id`, `sa_c    hild_id`, `sa_content`, `sa_content_en`, `sa_tag`, `s_idx`, `sa_type`, `sa_reg_dt`, `sa_mod_dt`)      VALUES";
  for (let el of answer) {
    for (let el of answer) {
      sql +=
        "(" +
        el.sa_pa_id +
        "," +
        el.sa_id +
        "," +
        el.sa_sub_id +
        "," +
        el.sa_child_id +
        ',"' +
        el.sa_content +
        '","' +
        el.sa_content_en +
        "\",'" +
        el.sa_tag +
        "'," +
        el.s_idx +
        "," +
        null +
        ",'" +
        el.sa_reg_dt +
        "'" +
        "," +
        null +
        "    ),";
    }
    sql = sql.substring(0, sql.length - 1);

    // console.log(sql);
    test = "SELECT * FROM survey_question LIMIT 1";
    surveyDB.query(sql, (err, res) => {
      if (err) throw err;
      else {
        console.log(res);
      }
    });
  }
}
