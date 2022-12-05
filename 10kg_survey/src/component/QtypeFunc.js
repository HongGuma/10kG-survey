import React from "react";
import axios from "axios";

export async function choiceLoad(applyNum, choiceNm) {
  const res = await axios.post(process.env.REACT_APP_API + "/tmp/load/choice", {
    applyNum: applyNum,
    choice_nm: choiceNm,
  });
  return res.data;
}
