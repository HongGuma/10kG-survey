const logger = require("../config/winston.js");
const DB_10kG = require("../dbInfo.js");
const DB_Survey = require("../dbInfo2.js");
const express = require("express");
const requestIP = require("request-ip");
const route = express.Router();

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
  today.getSeconds().toString();

//참가자 번호 리스트 불러오기
route.post("/applyMembers", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const sql = "SELECT apply_num FROM survey_choice_3_0";
    DB_Survey.query(sql, (err, data) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info(`applyMembers/ apply number list (ip:${ip}`);
        // console.log(data);
        res.send(data);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//신규 정보 생성
route.post("/insertMember", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { applyNum } = req.body;
    const sql = "SELECT * FROM survey_choice_3_0 WHERE apply_num = " + applyNum;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        if (result.length <= 0) {
          const insert =
            "INSERT INTO survey_choice_3_0(s_idx,apply_num,reg_dt) value(201901," +
            applyNum +
            "," +
            regDate +
            ")";
          DB_Survey.query(insert, (err, result) => {
            if (err) {
              logger.error(err);
              res.send("-1");
            } else {
              logger.info("insertMember/ " + applyNum + ", ip" + ip);
              res.send("0");
            }
          });
        } else {
          logger.info(
            "insertMember/ one apply number : applyNum" + ", ip" + ip
          );
          res.send("1");
        }
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//생성전 중복 검사
route.post("/insertDupliCheck", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { applyNum } = req.body;
    const sql =
      "SELECT apply_num FROM survey_choice_3_0 WHERE apply_num = " + applyNum;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info("insertDupliCheck / apply number, ip" + ip);
        if (result.length == 0) {
          res.send("0");
        } else {
          res.send("1");
        }
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//참가자 번호만 생성
route.post("/insertApplyNum", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { applyNum } = req.body;
    const sql =
      "INSERT INTO survey_choice_3_0(apply_num) VALUES (" + applyNum + ")";
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info("insertApplyNum /" + applyNum + ", ip" + ip);
        res.send("0");
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//참가자 번호 삭제 (설문지 내용도 삭제)
route.post("/deleteApplyNum", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { applyNum } = req.body;
    const sql = "DELETE FROM survey_choice_3_0 WHERE apply_num = " + applyNum;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info("deleteApplyNum /" + applyNum + ", ip" + ip);
        res.send("0");
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//참가자 기초 정보 항목 불러오기
route.post("/basicInfo", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const sql =
      " select * from survey_question as q where q.ca_id = 0 and q.s_idx=201901";
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info("basicInfo/ basic info (ip:" + ip);
        res.send(result);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});
//ku10k 번호 불러오기
route.post("/load/ku10k_num", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { apply_num } = req.body;
    const sql =
      " select KU10K_no from 10kG_DB.10kG_applyInfo where apply_num=" +
      apply_num;
    DB_Survey.query(sql, (err, data) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info("/load/ku10k_num/ apply num = " + apply_num + "(ip:" + ip);
        res.send(data);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});
//카테고리 불러오기
route.post("/category", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const sql = "SELECT * FROM survey_category WHERE ca_id > 0";
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        // logger.info('POST/ category');
        res.send(result);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//질문지 불러오기
route.post("/question", (req, res) => {
  try {
    const { ca_num } = req.body;
    let sql = "select * from survey_question as q";
    sql += " where q.s_idx = 201901 and q.ca_id = " + ca_num;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        // logger.info('POST/ questions');
        res.send(result);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//답변 불러오기
route.post("/answer", (req, res) => {
  try {
    const { q_num } = req.body;
    let sql = " select * from survey_answer as a";
    sql += " where a.s_idx = 201901 and a.sa_parent_id = " + q_num;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        let arr = new Array();
        for (let el of result) {
          arr.push({
            sa_id: el.sa_id,
            sa_sub_id: el.sa_sub_id,
            sa_child_id: el.sa_child_id,
            sa_content: el.sa_content.replace(/\d{1,3}.\s|\d{1,3}./s, ""),
          });
        }
        // logger.info('POST/ answers');
        res.send(arr);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//선택한 답변 저장하기
route.post("/save/choices", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { applyNum, choices } = req.body;
    let sql = "UPDATE survey_choice_3_0 SET ";
    for (let el of choices) {
      if (
        el.id == "sc_idx" ||
        el.id == "s_idx" ||
        el.id == "apply_num" ||
        el.id.includes("r_0_")
      ) {
        continue;
      }
      if (el.value == null) {
        continue;
      } else {
        sql += el.id + ' = "' + el.value + '", ';
      }
    }
    sql = sql.slice(0, sql.length - 2);
    sql += " WHERE apply_num = " + applyNum;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info(`/save/choices/ apply num = ${applyNum} (ip=${ip})`);
        res.send(result);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//선택한 답변 전부 불러오기
route.post("/load/choices", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { applyNum } = req.body;
    const sql = "SELECT * FROM survey_choice_3_0 WHERE apply_num = " + applyNum;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info("/load/choices/ " + ip);
        res.send(result);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

route.post("/load/choice", (req, res) => {
  try {
    const { applyNum, choice_nm } = req.body;
    // console.log(applyNum+','+choice_nm);
    const sql = `SELECT ${choice_nm} FROM survey_choice_3_0 WHERE apply_num = ${applyNum}`;
    DB_Survey.query(sql, (err, data) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        res.send(data);
        // console.log(data);
      }
    });
  } catch (e) {
    logger(e);
    res.send("-1");
  }
});

//선택한 내용 불러오기 (참여자 기초 정보만)
route.post("/load/basicInfo", (req, res) => {
  try {
    const { applyNum } = req.body;
    const sql =
      "SELECT sc_idx,s_idx,apply_num,r_0_1,r_0_2,r_0_3,r_0_4,r_0_5,r_0_6,r_0_7,r_0_8,r_0_9," +
      "r_0_10,r_0_11,r_0_12,r_0_13,r_0_14,r_0_15,r_0_16 FROM survey_choice_3_0 WHERE apply_num = " +
      applyNum;
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        // logger.info('POST/ ');
        res.send(result);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

//참여자 기초 정보 저장하기
route.post("/save/basicInfo", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    const { applyNum, choices } = req.body;
    const sql =
      `UPDATE survey_choice_3_0 SET r_0_1 = '${choices.r_0_1}', r_0_2 = '${choices.r_0_2}', r_0_3 = '${choices.r_0_3}', r_0_4 = '${choices.r_0_4}',` +
      `r_0_5= '${choices.r_0_5}', r_0_6='${choices.r_0_6}',r_0_7='${choices.r_0_7}',r_0_8 = '${choices.r_0_8}',r_0_9='${choices.r_0_9}',r_0_10='${choices.r_0_10}',` +
      `r_0_11='${choices.r_0_11}',r_0_12='${choices.r_0_12}',r_0_13='${choices.r_0_13}',r_0_14='${choices.r_0_14}',r_0_15='${choices.r_0_15}',r_0_16='${choices.r_0_16}',` +
      `reg_dt = '${regDate}' where apply_num = ${applyNum}`;
    console.log(sql);
    DB_Survey.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send("-1");
      } else {
        logger.info(
          `/save/basicInfo/ apply num = ${applyNum}, res = ${result} (ip:${ip})`
        );
        res.send("0");
      }
    });
  } catch (e) {
    logger.error(e);
  }
});
// DB_Survey.end();
module.exports = route;
