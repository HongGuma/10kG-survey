import React, { useState } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
// import AgGrid from "./AgGrid";

import "./tmp.css";

const Main = () => {
  const [applyNum, setApplyNum] = useState("");
  const [listToggle, setListToggle] = useState(false);
  const [applyMemList, setApplyMemlist] = useState(null);
  let history = useHistory();

  React.useEffect(() => {
    if (applyMemList != null && applyMemList.length > 0) {
      setApplyNum(applyMemList[0].apply_num);
    }
  }, [applyMemList]);

  function insertApplyNum(e) {
    setApplyNum(e.target.value);
  }

  async function onSubmit() {
    if (applyNum != null && applyNum != "") {
      const res = await axios.post(
        process.env.REACT_APP_API + "/tmp/insertMember",
        { applyNum: applyNum }
      );
      if (res.data == "-1") {
        //db 저장 안됨.
        alert("error! 관리자에게 문의하세요.");
      } else if (res.data == "0") {
        alert("신규 생성");
        history.push("/tmp/00/" + applyNum);
      } else if (res.data == "1") {
        history.push("/tmp/00/" + applyNum);
      }
    } else {
      alert("참가번호는 비울 수 없습니다.");
    }
  }

  async function loadList() {
    const res = await axios.post(
      process.env.REACT_APP_API + "/tmp/applyMembers"
    );
    if (res.data == "-1") {
      alert("에러 발생! 관리자에게 문의해주세요.");
    } else {
      if (res.data.length == 0) {
        alert("리스트가 없습니다.");
        setListToggle(false);
      } else {
        setApplyMemlist(res.data);
        setListToggle(true);
      }
    }
  }

  async function addApplyNum() {
    if (window.confirm("생성 하시겠습니까?")) {
      if (applyNum != "" && applyNum != null) {
        const dupli = await axios.post(
          process.env.REACT_APP_API + "/tmp/insertDupliCheck",
          { applyNum: applyNum }
        );
        if (dupli.data == "0") {
          const res = await axios.post(
            process.env.REACT_APP_API + "/tmp/insertApplyNum",
            { applyNum: applyNum }
          );
          if (res.data == "-1") {
            alert("생성 실패! 관리자에게 문의해주세요.");
          } else {
            alert("생성 완료.");
            window.location.reload();
          }
        } else {
          alert("중복된 참가자 정보 입니다.");
        }
      } else {
        alert("참가자 번호를 입력해주세요.");
      }
    }
  }

  async function delApplyNum() {
    if (window.confirm("삭제 하시겠습니까?")) {
      if (applyNum != "" && applyNum != null) {
        const res = await axios.post(
          process.env.REACT_APP_API + "/tmp/deleteApplyNum",
          { applyNum: applyNum }
        );
        if (res.data == "-1") {
          alert("삭제 실패! 관리자에게 문의해주세요.");
        } else {
          window.location.reload();
        }
      } else {
        alert("참가자 번호를 입력해주세요.");
      }
    }
  }

  function selectOption(e) {
    setApplyNum(e.target.value);
  }

  return (
    <div className="main-wrap">
      <h1>v3.0 설문지</h1>
      <div className="main">
        <div className="load-btn">
          <button onClick={addApplyNum}>참가자 번호 생성</button>
          <button onClick={loadList}>참가 리스트 불러오기</button>
          <button onClick={delApplyNum}>참가자 번호 삭제</button>
        </div>
        {listToggle && (
          <select onChange={(e) => selectOption(e)} defaultValue={applyNum}>
            {applyMemList.map((el, idx) => (
              <option className="option" key={idx} value={el.apply_num}>
                {el.apply_num}
              </option>
            ))}
          </select>
        )}
        <p>참가 번호 입력</p>
        <input
          type="text"
          onChange={(e) => insertApplyNum(e)}
          value={applyNum}
        />
        <button onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
};

export default Main;
