import React from "react";
import axios from "axios";
import { choiceLoad } from "./QtypeFunc.js";

//default
export const Qtype00 = ({ answers }) => {
  return (
    <ul>
      {answers.map((item, idx) => (
        <li key={idx}> {item.sa_content} </li>
      ))}
    </ul>
  );
};

//질문 타입 1번 : 라디오 버튼 + 기타(주관식)
export const Qtype01 = ({
  answers,
  choiceNm,
  choiceList,
  changeChoice,
  applyNum,
}) => {
  const [txtValue, setTxtValue] = React.useState("");
  const [numValue, setNumValue] = React.useState(null);
  const choiceTxt = choiceNm + "_text";
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    for (let el of choiceList) {
      if (el.id == choiceTxt) {
        if (el.value != null && el.value != "") {
          setTxtValue(el.value);
        }
      } else if (el.id == choiceNm) {
        if (el.value == null || el.value == "") {
          setNumValue(null);
        }
        setNumValue(el.value);
      }
    }
  }, [choiceNm]);

  function onChangeValue(e) {
    const { name, value } = e.target;
    if (name == choiceTxt) {
      setTxtValue(value);
    }
    if (name == choiceNm) {
      setNumValue(value);
    }
    changeChoice(name, value);
  }

  return (
    <ul>
      {answers.map((item, idx) =>
        item.sa_content == "기타" || item.sa_content.includes("기타:") ? (
          <li key={idx}>
            <label>
              <input
                type="radio"
                value={item.sa_id}
                checked={numValue == item.sa_id}
                name={choiceNm}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              {item.sa_content}
              <input
                type="text"
                value={txtValue}
                name={choiceNm + "_text"}
                onChange={(e) => onChangeValue(e)}
              />
            </label>
          </li>
        ) : (
          <li key={idx}>
            {" "}
            <label>
              <input
                type="radio"
                value={item.sa_id}
                checked={numValue == item.sa_id}
                name={choiceNm}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              {item.sa_content}
            </label>{" "}
          </li>
        )
      )}
    </ul>
  );
};
//질문 4번용 답변 출력
export const Qtype04 = ({
  answers,
  choiceNm,
  subId,
  choiceList,
  changeChoice,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_4: null,
    r_4_1: null,
  });
  const { r_4, r_4_1 } = inputItem;
  React.useEffect(() => {
    setInputItem({
      r_4: choiceList[25].value,
      r_4_1: choiceList[26].value,
    });
  }, [choiceList]);

  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
  }

  return (
    <ul>
      {answers.map((item, idx) =>
        subId != null
          ? item.sa_id > 5 && (
              <li key={idx}>
                {" "}
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={r_4_1 == item.sa_id}
                    name={"r_4_1"}
                    onChange={(e) => onChangeValue(e)}
                  />{" "}
                  {item.sa_content}
                </label>{" "}
              </li>
            )
          : item.sa_id <= 5 && (
              <li key={idx}>
                {" "}
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={r_4 == item.sa_id}
                    name={"r_4"}
                    onChange={(e) => onChangeValue(e)}
                  />{" "}
                  {item.sa_content}
                </label>{" "}
              </li>
            )
      )}
    </ul>
  );
};

//질문 10번용 답변 출력
export const Qtype10 = ({ answers, choiceNm, choiceList, changeChoice }) => {
  const [inputItem, setInputItem] = React.useState({
    r_10: null,
    r_10_0_text: "",
    r_10_6_text: "",
  });
  const { r_10, r_10_0_text, r_10_6_text } = inputItem;
  const [textValue0, setTextValue0] = React.useState("");
  const [textValue6, setTextValue6] = React.useState("");
  React.useEffect(() => {
    setInputItem({
      r_10: choiceList[32].value,
      r_10_0_text: choiceList[33].value,
      r_10_6_text: choiceList[34].value,
    });
  }, [choiceList]);

  React.useEffect(() => {
    setTextValue0(choiceList[33].value);
    setTextValue6(choiceList[34].value);
  }, [choiceNm]);

  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
    if (name == "r_10_0_text") {
      setTextValue0(value);
    } else if (name == "r_10_6_text") {
      setTextValue6(value);
    }
  }
  return (
    <ul>
      <li>
        {" "}
        <label>
          번호기재 :{" "}
          <input
            type="text"
            value={textValue0}
            name="r_10_0_text"
            onChange={(e) => onChangeValue(e)}
          />
        </label>{" "}
      </li>
      <li>
        {" "}
        <label>
          <input
            type="radio"
            value={"1"}
            checked={r_10 == "1"}
            name="r_10"
            onChange={(e) => onChangeValue(e)}
          />{" "}
          갈색
        </label>{" "}
      </li>
      <li>
        {" "}
        <label>
          <input
            type="radio"
            value={"2"}
            checked={r_10 == "2"}
            name="r_10"
            onChange={(e) => onChangeValue(e)}
          />{" "}
          검정색
        </label>{" "}
      </li>
      <li>
        {" "}
        <label>
          <input
            type="radio"
            value={"3"}
            checked={r_10 == "3"}
            name="r_10"
            onChange={(e) => onChangeValue(e)}
          />{" "}
          녹색
        </label>{" "}
      </li>
      <li>
        {" "}
        <label>
          <input
            type="radio"
            value={"4"}
            checked={r_10 == "4"}
            name="r_10"
            onChange={(e) => onChangeValue(e)}
          />{" "}
          회색
        </label>{" "}
      </li>
      <li>
        {" "}
        <label>
          <input
            type="radio"
            value={"5"}
            checked={r_10 == "5"}
            name="r_10"
            onChange={(e) => onChangeValue(e)}
          />{" "}
          파란색
        </label>{" "}
      </li>
      <li>
        <label>
          <input
            type="radio"
            value={"6"}
            checked={r_10 == "6"}
            name="r_10"
            onChange={(e) => onChangeValue(e)}
          />{" "}
          기타
        </label>
        <input
          type="text"
          value={textValue6}
          name="r_10_6_text"
          onChange={(e) => onChangeValue(e)}
        />
      </li>
    </ul>
  );
};

//질문 15번 답변
export const Qtype15 = ({
  answers,
  choiceNm,
  subId,
  choiceList,
  changeChoice,
}) => {
  const [txtValue1, setTxtValue1] = React.useState("");
  const [txtValue2, setTxtValue2] = React.useState("");
  const [numValue, setNumValue] = React.useState(null);
  const choiceTxt1 = choiceNm + "_1_text";
  const choiceTxt2 = choiceNm + "_2_text";

  React.useEffect(() => {
    for (let el of choiceList) {
      if (el.id === choiceTxt1) {
        if (el.value != null && el.value != "") {
          setTxtValue1(el.value);
        }
      } else if (el.id === choiceTxt2) {
        if (el.value != null && el.value != "") {
          setTxtValue2(el.value);
        }
      } else if (el.id === choiceNm) {
        if (el.value != null && el.value != "") {
          setNumValue(el.value);
        }
      }
    }
    // console.log(txtValue);
  }, [choiceNm]);

  function onChangeValue(e) {
    const { name, value } = e.target;
    if (name == choiceTxt1) {
      setTxtValue1(value);
    }
    if (name == choiceTxt2) {
      setTxtValue2(value);
    }
    if (name == choiceNm) {
      setNumValue(value);
    }
    changeChoice(name, value);
  }

  return (
    <ul>
      {answers.map((item, idx) =>
        subId == null
          ? item.sa_id <= 2 && (
              <li key={idx}>
                {" "}
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={numValue == item.sa_id}
                    name={choiceNm}
                    onChange={(e) => onChangeValue(e)}
                  />{" "}
                  {item.sa_content}
                </label>{" "}
              </li>
            )
          : subId == 1
          ? item.sa_sub_id == 1 && (
              <li key={idx}>
                {" "}
                일주일에{" "}
                <input
                  type="text"
                  value={txtValue1}
                  name={choiceNm + "_1_text"}
                  onChange={(e) => onChangeValue(e)}
                />{" "}
              </li>
            )
          : item.sa_sub_id == 2 && (
              <li key={idx}>
                하루에{" "}
                <input
                  type="text"
                  value={txtValue1}
                  name={choiceNm + "_1_text"}
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                시간
                <input
                  type="text"
                  value={txtValue2}
                  name={choiceNm + "_2_text"}
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                분{" "}
              </li>
            )
      )}
    </ul>
  );
};

//질문 20번 답변
export const Qtype20 = ({ choiceList, changeChoice }) => {
  const [inputItem, setInputItem] = React.useState({
    r_20_1_text: "",
    r_20_2_text: "",
  });
  const { r_20, r_20_1_text, r_20_2_text } = inputItem;
  const [textValue1, setTextValue1] = React.useState("");
  const [textValue2, setTextValue2] = React.useState("");
  React.useEffect(() => {
    setInputItem({
      r_20_1_text: choiceList[60].value,
      r_20_2_text: choiceList[61].value,
    });
  }, [choiceList]);
  React.useEffect(() => {
    setTextValue1(choiceList[60].value);
    setTextValue2(choiceList[61].value);
  }, []);

  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
    if (name == "r_20_1_text") {
      setTextValue1(value);
    } else if (name == "r_20_2_text") {
      setTextValue2(value);
    }
  }

  return (
    <ul>
      <li>
        하루에{" "}
        <input
          type="text"
          value={textValue1}
          name={"r_20_1_text"}
          onChange={(e) => onChangeValue(e)}
        />{" "}
        시간
        <input
          type="text"
          value={textValue2}
          name={"r_20_2_text"}
          onChange={(e) => onChangeValue(e)}
        />{" "}
        분
      </li>
    </ul>
  );
};

//복수 응답중 답변이 10개 미만
export const Qtype51 = ({
  answers,
  choiceNm,
  choiceList,
  valueChange,
  removeValue,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_7: "",
    r_51: "",
    r_54: "",
    r_90: "",
    r_91: "",
    r_96: "",
    r_104: "",
    r_107: "",
    r_109: "",
    r_149: "",
    r_150: "",
  });
  const {
    r_7,
    r_51,
    r_54,
    r_55,
    r_90,
    r_91,
    r_96,
    r_104,
    r_107,
    r_109,
    r_149,
    r_150,
  } = inputItem;
  const [textValue, setTextValue] = React.useState("");

  React.useEffect(() => {
    setInputItem({
      r_7: choiceList[29].value,
      r_51: choiceList[92].value,
      r_54: choiceList[99].value,
      r_90: choiceList[136].value,
      r_91: choiceList[137].value,
      r_96: choiceList[142].value,
      r_104: choiceList[150].value,
      r_107: choiceList[153].value,
      r_109: choiceList[155].value,
      r_149: choiceList[219].value,
      r_150: choiceList[220].value,
    });
  }, [choiceList]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    setTextValue(value, choiceNm);
  }
  function onClickInsert(id, content, tag) {
    if (tag == null) {
      valueChange(id + "." + content, choiceNm);
    } else {
      if (textValue != null && textValue != "") {
        valueChange(id + ".기타:" + textValue, choiceNm);
      } else {
        valueChange(id + ".기타:NA", choiceNm);
      }
    }
  }

  return (
    <ul>
      {choiceNm == "r_7" && (
        <li>
          입력된 내용 : {r_7}{" "}
          <button onClick={() => removeValue("r_7")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_51" && (
        <li>
          입력된 내용 : {r_51}{" "}
          <button onClick={() => removeValue("r_51")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_54" && (
        <li>
          입력된 내용 : {r_54}{" "}
          <button onClick={() => removeValue("r_54")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_90" && (
        <li>
          입력된 내용 : {r_90}{" "}
          <button onClick={() => removeValue("r_90")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_91" && (
        <li>
          입력된 내용 : {r_91}{" "}
          <button onClick={() => removeValue("r_91")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_96" && (
        <li>
          입력된 내용 : {r_96}{" "}
          <button onClick={() => removeValue("r_96")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_104" && (
        <li>
          입력된 내용 : {r_104}{" "}
          <button onClick={() => removeValue("r_104")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_107" && (
        <li>
          입력된 내용 : {r_107}{" "}
          <button onClick={() => removeValue("r_107")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_109" && (
        <li>
          입력된 내용 : {r_109}{" "}
          <button onClick={() => removeValue("r_109")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_149" && (
        <li>
          입력된 내용 : {r_149}{" "}
          <button onClick={() => removeValue("r_149")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_150" && (
        <li>
          입력된 내용 : {r_150}{" "}
          <button onClick={() => removeValue("r_150")}>지우기</button>
        </li>
      )}
      {answers.map((item, idx) =>
        item.sa_content.includes("기타") ? (
          <li key={idx}>
            <label>
              <button
                onClick={(e) => onClickInsert(item.sa_id, e.target.value, 1)}
              >
                v
              </button>
              {item.sa_content}
              <input
                type="text"
                onChange={(e) => onChangeValue(e)}
                name={item.sa_id}
              />
            </label>
          </li>
        ) : (
          <li key={idx}>
            <label>
              <button
                onClick={() => onClickInsert(item.sa_id, item.sa_content)}
              >
                v
              </button>
              {item.sa_content}
            </label>
          </li>
        )
      )}
    </ul>
  );
};

//질문 52번 답변 (서브 답변 3개)
export const Qtype52 = ({
  answers,
  choiceNm,
  subID,
  choiceList,
  changeChoice,
  checkedChoice,
}) => {
  const [textValue, setTextValue] = React.useState("");
  const [inputItem, setInputItem] = React.useState({
    r_52: null,
    r_52_1: null,
    r_52_2: null,
    r_52_3: null,
    r_52_3_text: "",
  });
  const { r_52, r_52_1, r_52_2, r_52_3, r_52_3_text } = inputItem;

  React.useEffect(() => {
    setInputItem({
      r_52: choiceList[93].value,
      r_52_1: choiceList[94].value,
      r_52_2: choiceList[95].value,
      r_52_3: choiceList[96].value,
      r_52_3_text: choiceList[97].value,
    });
  }, [choiceList]);
  React.useEffect(() => {
    setTextValue(choiceList[98].value);
  }, [choiceNm]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    if (name == "r_52_3_text") {
      setTextValue(value);
    }
    changeChoice(name, value);
  }
  function onChangeChecked(e) {
    checkedChoice(e.target.checked, e.target.name, e.target.value);
    // 아이템 한개만 남았을때 체크 해제 하기
  }

  function checked(str, value) {
    const part = str.split(",");
    let cnt = 0;
    for (let i of part) {
      if (i == value) {
        cnt += 1;
      }
    }
    if (cnt == 0) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <ul>
      {answers.map((item, idx) =>
        subID == null
          ? item.sa_id <= 2 && (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={r_52 == item.sa_id}
                    name={choiceNm}
                    onChange={(e) => onChangeValue(e)}
                  />{" "}
                  {item.sa_content}
                </label>
              </li>
            )
          : subID == 1
          ? item.sa_sub_id == 1 && (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={r_52_1 == item.sa_id}
                    name={choiceNm}
                    onChange={(e) => onChangeValue(e)}
                  />
                  {item.sa_content.replace(/\d-\d./g, "")}{" "}
                </label>
              </li>
            )
          : subID == 2
          ? item.sa_sub_id == 2 && (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={r_52_2 == item.sa_id}
                    name={choiceNm}
                    onChange={(e) => onChangeValue(e)}
                  />{" "}
                  {item.sa_content.replace(/\d-\d./g, "")}{" "}
                </label>
              </li>
            )
          : item.sa_content.includes("기타(") ||
            item.sa_content.includes("기재")
          ? item.sa_sub_id == 3 && (
              <li key={idx}>
                <label>
                  <input
                    type="checkbox"
                    value={item.sa_id}
                    name={"r_52_3"}
                    checked={r_52_3 != null && checked(r_52_3, item.sa_id)}
                    onChange={(e) => onChangeChecked(e)}
                  />{" "}
                  {item.sa_content.replace(/\d-\d./g, "")}
                  <input
                    type="text"
                    value={textValue}
                    name={"r_52_3_text"}
                    onChange={(e) => onChangeValue(e)}
                  />
                </label>
              </li>
            )
          : item.sa_sub_id == 3 && (
              <li key={idx}>
                <label>
                  <input
                    type="checkbox"
                    value={item.sa_id}
                    name={"r_52_3"}
                    checked={r_52_3 != null && checked(r_52_3, item.sa_id)}
                    onChange={(e) => onChangeChecked(e)}
                  />{" "}
                  {item.sa_content.replace(/\d-\d./g, "")}{" "}
                </label>
              </li>
            )
      )}
    </ul>
  );
};

//질문 55번 답변
export const Qtype55 = ({
  answers,
  choiceNm,
  choiceList,
  valueChange,
  removeValue,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_55: null,
  });
  const { r_55 } = inputItem;
  const [textValue, setTextValue] = React.useState("");

  React.useEffect(() => {
    // console.log(choiceNm);
    setInputItem({
      r_55: choiceList[100].value,
    });
    // console.log(r_172);
  }, [choiceList]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    setTextValue(value, "r_55");
  }
  function onClickInsert(id, value) {
    valueChange(id + "." + value, "r_55");
  }

  return (
    <ul>
      <li>
        입력된 내용 : {r_55}{" "}
        <button onClick={() => removeValue("r_55")}>지우기</button>
      </li>
      {answers.map((item, idx) => (
        <li key={idx}>
          <label>
            <button onClick={(e) => onClickInsert(item.sa_id, item.sa_content)}>
              v
            </button>
            {item.sa_content}
          </label>
        </li>
      ))}
    </ul>
  );
};

//질문 75번 답변
export const Qtype75 = ({ answers, choiceNm, choiceList, changeChoice }) => {
  const [inputItem, setInputItem] = React.useState({
    r_75: null,
    r_75_text: "",
  });
  const { r_75, r_75_text } = inputItem;
  React.useEffect(() => {
    setInputItem({
      r_75: choiceList[120].value,
      r_75_text: choiceList[121].value,
    });
  }, [choiceList]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
  }

  return (
    <ul>
      {answers.map((item, idx) =>
        item.sa_id == 1 ? (
          <li key={idx}>
            <label>
              <input
                type="radio"
                value={item.sa_id}
                checked={r_75 == item.sa_id}
                name={choiceNm}
                onChange={(e) => onChangeValue(e)}
              />
              예(유형 :
              <input
                type="text"
                value={r_75_text}
                name={choiceNm + "_text"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              )
            </label>
          </li>
        ) : (
          <li key={idx}>
            <label>
              <input
                type="radio"
                value={item.sa_id}
                checked={r_75 == item.sa_id}
                name={choiceNm}
                onChange={(e) => onChangeValue(e)}
              />
              {item.sa_content}
            </label>
          </li>
        )
      )}
    </ul>
  );
};

//질문 130번 답변
export const Qtype130 = ({
  answers,
  choiceNm,
  subID,
  choiceList,
  changeChoice,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_130: null,
    r_130_1_1: "",
    r_130_1_2: "",
    r_130_1_3: "",
    r_130_1_4: "",
    r_130_1_5: null,
    r_130_2_1: "",
    r_130_2_2: "",
    r_130_2_3: "",
    r_130_2_4: "",
  });
  const {
    r_130,
    r_130_1_1,
    r_130_1_2,
    r_130_1_3,
    r_130_1_4,
    r_130_1_5,
    r_130_2_1,
    r_130_2_2,
    r_130_2_3,
    r_130_2_4,
  } = inputItem;
  React.useEffect(() => {
    // console.log(choiceList);
    setInputItem({
      r_130: choiceList[176].value,
      r_130_1_1: choiceList[177].value,
      r_130_1_2: choiceList[178].value,
      r_130_1_3: choiceList[179].value,
      r_130_1_4: choiceList[180].value,
      r_130_1_5: choiceList[181].value,
      r_130_2_1: choiceList[182].value,
      r_130_2_2: choiceList[183].value,
      r_130_2_3: choiceList[184].value,
      r_130_2_4: choiceList[185].value,
    });
  }, [choiceList]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
  }

  return (
    <>
      <ul>
        {answers.map(
          (item, idx) =>
            (item.sa_id == 1 || item.sa_id == 7 || item.sa_id == 8) && (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={r_130 == item.sa_id}
                    name={choiceNm}
                    onChange={(e) => onChangeValue(e)}
                  />{" "}
                  {item.sa_content.replace(/\d./g, "")}
                </label>
              </li>
            )
        )}
      </ul>
      {r_130 == "1" ? (
        <ul>
          <li>
            흡연기간 :{" "}
            <input
              type="text"
              value={r_130_1_1}
              name={"r_130_1_1"}
              onChange={(e) => onChangeValue(e)}
            />
            년
            <input
              type="text"
              value={r_130_1_2}
              name={"r_130_1_2"}
              onChange={(e) => onChangeValue(e)}
            />
            개월{" "}
          </li>
          <li>
            1일 평균 흡연량 :{" "}
            <input
              type="text"
              value={r_130_1_3}
              name={"r_130_1_3"}
              onChange={(e) => onChangeValue(e)}
            />
            갑
            <input
              type="text"
              value={r_130_1_4}
              name={"r_130_1_4"}
              onChange={(e) => onChangeValue(e)}
            />
            개피{" "}
          </li>
          <li onChange={(e) => onChangeValue(e)}>
            {" "}
            1주일 평균 흡연 빈도:
            <label>
              <input
                type="radio"
                value={"1"}
                checked={r_130_1_5 == "1"}
                name={"r_130_1_5"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              주 1~2회
            </label>
            <label>
              <input
                type="radio"
                value={"2"}
                checked={r_130_1_5 == "2"}
                name={"r_130_1_5"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              주 3~5회
            </label>
            <label>
              <input
                type="radio"
                value={"3"}
                checked={r_130_1_5 == "3"}
                name={"r_130_1_5"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              주 6~7회
            </label>
          </li>
        </ul>
      ) : r_130 == "8" ? (
        <ul>
          <li>
            과거에 흡연 경험이 있는 경우, 과거 흡연기간 :
            <input
              type="text"
              value={r_130_2_1}
              name={"r_130_2_1"}
              onChange={(e) => onChangeValue(e)}
            />
            년
            <input
              type="text"
              value={r_130_2_2}
              name={"r_130_2_2"}
              onChange={(e) => onChangeValue(e)}
            />
            개월{" "}
          </li>
          <li>
            금연(흡연 중지) 이후 현재까지의 기간 :
            <input
              type="text"
              value={r_130_2_3}
              name={"r_130_2_3"}
              onChange={(e) => onChangeValue(e)}
            />
            년
            <input
              type="text"
              value={r_130_2_4}
              name={"r_130_2_4"}
              onChange={(e) => onChangeValue(e)}
            />
            개월{" "}
          </li>
        </ul>
      ) : null}
    </>
  );
};

//질문 131번 답변
export const Qtype131 = ({
  answers,
  choiceNm,
  subID,
  choiceList,
  changeChoice,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_131: null,
    r_131_1_1: "",
    r_131_1_2: "",
    r_131_1_3: "",
    r_131_1_4: "",
    r_131_1_5: "",
    r_131_1_6: "",
    r_131_1_7: "",
    r_131_3_1: "",
    r_131_3_2: "",
    r_131_3_3: "",
    r_131_3_4: "",
  });
  const {
    r_131,
    r_131_1_1,
    r_131_1_2,
    r_131_1_3,
    r_131_1_4,
    r_131_1_5,
    r_131_1_6,
    r_131_1_7,
    r_131_3_1,
    r_131_3_2,
    r_131_3_3,
    r_131_3_4,
  } = inputItem;
  React.useEffect(() => {
    setInputItem({
      r_131: choiceList[186].value,
      r_131_1_1: choiceList[187].value,
      r_131_1_2: choiceList[188].value,
      r_131_1_3: choiceList[189].value,
      r_131_1_4: choiceList[190].value,
      r_131_1_5: choiceList[191].value,
      r_131_1_6: choiceList[192].value,
      r_131_1_7: choiceList[193].value,
      r_131_3_1: choiceList[194].value,
      r_131_3_2: choiceList[195].value,
      r_131_3_3: choiceList[196].value,
      r_131_3_4: choiceList[197].value,
    });
  }, [choiceList]);

  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
  }

  return (
    <>
      <ul>
        {answers.map(
          (item, idx) =>
            (item.sa_id == 1 || item.sa_id == 10 || item.sa_id == 11) && (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    value={item.sa_id}
                    checked={r_131 == item.sa_id}
                    name={choiceNm}
                    onChange={(e) => onChangeValue(e)}
                  />{" "}
                  {item.sa_content.replace(/\d./g, "")}
                </label>
              </li>
            )
        )}
      </ul>
      {r_131 == "1" ? (
        <ul>
          <li>
            음주기간:
            <input
              type="text"
              value={r_131_1_1}
              name={"r_131_1_1"}
              onChange={(e) => onChangeValue(e)}
            />
            년
            <input
              type="text"
              value={r_131_1_2}
              name={"r_131_1_2"}
              onChange={(e) => onChangeValue(e)}
            />
            개월
          </li>
          <li>
            1주일(한달) 음주빈도:
            <label>
              <input
                type="radio"
                value={"1"}
                checked={r_131_1_3 == "1"}
                name={"r_131_1_3"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              한달에 한 번 정도
            </label>
            <br />
            <label>
              <input
                type="radio"
                value={"2"}
                checked={r_131_1_3 == "2"}
                name={"r_131_1_3"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              주 1~2회
            </label>
            <br />
            <label>
              <input
                type="radio"
                value={"3"}
                checked={r_131_1_3 == "3"}
                name={"r_131_1_3"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              주 3~5회
            </label>
            <br />
            <label>
              {" "}
              <input
                type="radio"
                value={"4"}
                checked={r_131_1_3 == "4"}
                name={"r_131_1_3"}
                onChange={(e) => onChangeValue(e)}
              />{" "}
              주 6~7회
            </label>
            <br />
          </li>
          <li>
            평균 음주량 (택일 또는 복수 기재 가능)
            <br />
            소주:{" "}
            <input
              type="text"
              value={r_131_1_4}
              name={"r_131_1_4"}
              onChange={(e) => onChangeValue(e)}
            />
            병{" "}
            <input
              type="text"
              value={r_131_1_5}
              name={"r_131_1_5"}
              onChange={(e) => onChangeValue(e)}
            />
            잔 (50ml)
            <br />
            맥주:{" "}
            <input
              type="text"
              value={r_131_1_6}
              name={"r_131_1_6"}
              onChange={(e) => onChangeValue(e)}
            />
            잔 (355ml)
            <br />
            와인:{" "}
            <input
              type="text"
              value={r_131_1_7}
              name={"r_131_1_7"}
              onChange={(e) => onChangeValue(e)}
            />
            잔 (100ml)
            <br />
          </li>
        </ul>
      ) : r_131 == "11" ? (
        <ul>
          <li>
            음주기간
            <input
              type="text"
              value={r_131_3_1}
              name={"r_131_3_1"}
              onChange={(e) => onChangeValue(e)}
            />
            년
            <input
              type="text"
              value={r_131_3_2}
              name={"r_131_3_2"}
              onChange={(e) => onChangeValue(e)}
            />
            개월
          </li>
          <li>
            금주(음주 중지) 이후 현재까지의 기간:
            <input
              type="text"
              value={r_131_3_3}
              name={"r_131_3_3"}
              onChange={(e) => onChangeValue(e)}
            />
            년
            <input
              type="text"
              value={r_131_3_4}
              name={"r_131_3_4"}
              onChange={(e) => onChangeValue(e)}
            />
            개월
          </li>
        </ul>
      ) : null}
    </>
  );
};

//질문 138번 답변
export const Qtype138 = ({ answers, choiceNm, choiceList, changeChoice }) => {
  const [checked, setChecked] = React.useState(false);
  const [inputItem, setInputItem] = React.useState({
    r_138: null,
    r_138_1: null,
    r_138_1_text: "",
    r_138_2: null,
    r_138_2_text: "",
  });
  const { r_138, r_138_1, r_138_1_text, r_138_2, r_138_2_text } = inputItem;
  React.useEffect(() => {
    // console.log(choiceList);
    setInputItem({
      r_138: choiceList[204].value,
      r_138_1: choiceList[205].value,
      r_138_1_text: choiceList[206].value,
      r_138_2: choiceList[207].value,
      r_138_2_text: choiceList[208].value,
    });
  }, [choiceList]);
  React.useEffect(() => {
    if (r_138 == "3") {
      setInputItem({
        ...inputItem,
        r_138_1: null,
        r_138_2: null,
        r_138_1_text: "",
        r_138_2_text: "",
      });
    }
  }, [r_138]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
  }
  function onChangeChecked(e) {
    if (e.target.checked) {
      changeChoice("r_138", "3");
    } else {
      changeChoice("r_138", null);
    }
    // 아이템 한개만 남았을때 체크 해제 하기
  }

  return (
    <ul>
      {answers.map((el, idx) =>
        el.sa_id == 1 ? (
          <li key={idx}>
            {" "}
            기상
            <input
              type="radio"
              value={"1"}
              checked={r_138_1 == "1"}
              name={"r_138_1"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            오전
            <input
              type="radio"
              value={"2"}
              checked={r_138_1 == "2"}
              name={"r_138_1"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            오후
            <input
              type="text"
              value={r_138_1_text}
              name={"r_138_1_text"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            시
          </li>
        ) : el.sa_id == 2 ? (
          <li key={idx}>
            {" "}
            취침
            <input
              type="radio"
              value={"1"}
              checked={r_138_2 == "1"}
              name={"r_138_2"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            오전
            <input
              type="radio"
              value={"2"}
              checked={r_138_2 == "2"}
              name={"r_138_2"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            오후
            <input
              type="text"
              value={r_138_2_text}
              name={"r_138_2_text"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            시
          </li>
        ) : (
          <li key={idx}>
            <label>
              <input
                type="checkbox"
                name={"r_138"}
                checked={r_138 == "3" ? true : false}
                onChange={(e) => onChangeChecked(e)}
              />{" "}
              모르겠다.{" "}
            </label>
          </li>
        )
      )}
    </ul>
  );
};

//질문 151번 답변
export const Qtype151 = ({
  answers,
  choiceNm,
  choiceList,
  changeChoice,
  checkedChoice,
}) => {
  const [textValue, setTextValue] = React.useState("");
  const [inputItem, setInputItem] = React.useState({
    r_151: null,
    r_151_4: null,
    r_151_text: "",
  });
  const { r_151, r_151_4, r_151_text } = inputItem;
  React.useEffect(() => {
    // console.log(choiceList)
    setInputItem({
      r_151: choiceList[221].value,
      r_151_4: choiceList[222].value,
      r_151_text: choiceList[223].value,
    });
  }, [choiceList]);
  React.useEffect(() => {
    setTextValue(choiceList[223].value);
  }, [choiceNm]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    if (name == "r_151_text") {
      setTextValue(value);
    }
    changeChoice(name, value);
  }
  function onChangeChecked(e) {
    checkedChoice(e.target.checked, e.target.name, e.target.value);
    // console.log(e.target.checked+','+e.target.name+','+e.target.value)
  }
  function checked(str, value) {
    const part = str.split(",");
    let cnt = 0;
    for (let i of part) {
      if (i == value) {
        cnt += 1;
      }
    }
    if (cnt == 0) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <ul>
      {answers.map((el, idx) =>
        el.sa_sub_id == 0 ? (
          <li key={idx}>
            <label>
              <input
                type="radio"
                value={el.sa_id}
                checked={r_151 == el.sa_id}
                name={choiceNm}
                onChange={(e) => onChangeValue(e)}
              />
              {el.sa_content}
            </label>
          </li>
        ) : r_151 == 4 ? (
          el.sa_content.includes("기타") ? (
            el.sa_id > 4 && (
              <li key={idx}>
                <label>
                  <input
                    type="checkbox"
                    value={el.sa_id}
                    checked={r_151_4 != null && checked(r_151_4, el.sa_id)}
                    name={"r_151_4"}
                    onChange={(e) => onChangeChecked(e)}
                  />
                  {el.sa_content}
                  <input
                    type="text"
                    value={textValue}
                    name={choiceNm + "_text"}
                    onChange={(e) => onChangeValue(e)}
                  />
                </label>
              </li>
            )
          ) : (
            el.sa_id > 4 && (
              <li key={idx}>
                <label>
                  <input
                    type="checkbox"
                    value={el.sa_id}
                    checked={r_151_4 != null && checked(r_151_4, el.sa_id)}
                    name={"r_151_4"}
                    onChange={(e) => onChangeChecked(e)}
                  />
                  {el.sa_content}
                </label>
              </li>
            )
          )
        ) : null
      )}
    </ul>
  );
};

//복수 응답중 답변이 10개 이상
export const Qtype153 = ({
  answers,
  choiceNm,
  choiceList,
  valueChange,
  removeValue,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_153: null,
    r_154: null,
    r_155: null,
    r_156: null,
    r_157: null,
    r_158: null,
    r_159: null,
    r_160: null,
    r_161: null,
    r_162: null,
    r_163: null,
    r_164: null,
    r_165: null,
    r_166: null,
    r_169: null,
    r_170: null,
    r_171: null,
    r_174: null,
  });
  const {
    r_153,
    r_154,
    r_155,
    r_156,
    r_157,
    r_158,
    r_159,
    r_160,
    r_161,
    r_162,
    r_163,
    r_164,
    r_165,
    r_166,
    r_169,
    r_170,
    r_171,
    r_174,
  } = inputItem;
  const [textValue, setTextValue] = React.useState("");

  React.useEffect(() => {
    // console.log(choiceNm);
    // console.log(choiceList);
    setInputItem({
      r_153: choiceList[225].value,
      r_154: choiceList[226].value,
      r_155: choiceList[227].value,
      r_156: choiceList[228].value,
      r_157: choiceList[229].value,
      r_158: choiceList[230].value,
      r_159: choiceList[231].value,
      r_160: choiceList[232].value,
      r_161: choiceList[233].value,
      r_162: choiceList[234].value,
      r_163: choiceList[235].value,
      r_164: choiceList[236].value,
      r_165: choiceList[237].value,
      r_166: choiceList[238].value,
      r_169: choiceList[242].value,
      r_170: choiceList[243].value,
      r_171: choiceList[244].value,
      r_174: choiceList[247].value,
    });
    // console.log(r_172);
  }, [choiceList]);

  function onChangeValue(e) {
    const { name, value } = e.target;
    setTextValue(value, choiceNm);
  }
  function onClickInsert(id, value, tag) {
    if (tag == null) {
      valueChange(id + "." + value, choiceNm);
    } else {
      if (textValue != null && textValue != "") {
        valueChange(id + ".기타:" + textValue, choiceNm);
      } else {
        valueChange(id + ".기타:NA", choiceNm);
      }
    }
  }

  return (
    <ul>
      {choiceNm == "r_153" && (
        <li>
          입력된 내용 : {r_153}{" "}
          <button onClick={() => removeValue("r_153")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_154" && (
        <li>
          입력된 내용 : {r_154}{" "}
          <button onClick={() => removeValue("r_154")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_155" && (
        <li>
          입력된 내용 : {r_155}{" "}
          <button onClick={() => removeValue("r_155")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_156" && (
        <li>
          입력된 내용 : {r_156}{" "}
          <button onClick={() => removeValue("r_156")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_157" && (
        <li>
          입력된 내용 : {r_157}{" "}
          <button onClick={() => removeValue("r_157")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_158" && (
        <li>
          입력된 내용 : {r_158}{" "}
          <button onClick={() => removeValue("r_158")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_159" && (
        <li>
          입력된 내용 : {r_159}{" "}
          <button onClick={() => removeValue("r_159")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_160" && (
        <li>
          입력된 내용 : {r_160}{" "}
          <button onClick={() => removeValue("r_160")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_161" && (
        <li>
          입력된 내용 : {r_161}{" "}
          <button onClick={() => removeValue("r_161")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_162" && (
        <li>
          입력된 내용 : {r_162}{" "}
          <button onClick={() => removeValue("r_162")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_163" && (
        <li>
          입력된 내용 : {r_163}{" "}
          <button onClick={() => removeValue("r_163")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_164" && (
        <li>
          입력된 내용 : {r_164}{" "}
          <button onClick={() => removeValue("r_164")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_165" && (
        <li>
          입력된 내용 : {r_165}{" "}
          <button onClick={() => removeValue("r_165")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_166" && (
        <li>
          입력된 내용 : {r_166}{" "}
          <button onClick={() => removeValue("r_166")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_169" && (
        <li>
          입력된 내용 : {r_169}{" "}
          <button onClick={() => removeValue("r_169")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_170" && (
        <li>
          입력된 내용 : {r_170}{" "}
          <button onClick={() => removeValue("r_170")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_171" && (
        <li>
          입력된 내용 : {r_171}{" "}
          <button onClick={() => removeValue("r_171")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_174" && (
        <li>
          입력된 내용 : {r_174}{" "}
          <button onClick={() => removeValue("r_174")}>지우기</button>
        </li>
      )}
      {/*<li>입력된 내용 : {r_153} <button onClick={()=>removeValue("r_153")}>지우기</button></li>*/}
      {answers.map((item, idx) =>
        item.sa_content.includes("위 리스트 외의") ? (
          <li key={idx}>
            <label>
              <button
                onClick={(e) => onClickInsert(item.sa_id, e.target.value, 1)}
              >
                v
              </button>
              {item.sa_content}
              <input
                type="text"
                onChange={(e) => onChangeValue(e)}
                name={item.sa_id}
              />
            </label>
          </li>
        ) : (
          <li key={idx}>
            <label>
              <button
                onClick={() => onClickInsert(item.sa_id, item.sa_content)}
              >
                v
              </button>
              {item.sa_content}
            </label>
          </li>
        )
      )}
    </ul>
  );
};

//154번
export const Qtype154 = ({
  answers,
  choiceNm,
  choiceList,
  valueChange,
  removeValue,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_154: null,
    r_155: null,
    r_156: null,
    r_157: null,
    r_158: null,
    r_159: null,
    r_160: null,
    r_161: null,
    r_162: null,
    r_163: null,
    r_164: null,
    r_165: null,
    r_166: null,
  });
  const { r_153 } = inputItem;
  const [textValue, setTextValue] = React.useState("");

  React.useEffect(() => {
    // console.log(choiceNm);
    console.log(choiceList);
    setInputItem({
      r_154: choiceList[226].value,
      r_155: choiceList[227].value,
      r_156: choiceList[228].value,
      r_157: choiceList[229].value,
      r_158: choiceList[230].value,
      r_159: choiceList[231].value,
      r_160: choiceList[232].value,
      r_161: choiceList[233].value,
      r_162: choiceList[234].value,
      r_163: choiceList[235].value,
      r_164: choiceList[236].value,
      r_165: choiceList[237].value,
      r_166: choiceList[238].value,
    });
    // console.log(r_172);
  }, [choiceList]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    setTextValue(value, "r_153");
  }
  function onClickInsert(id, value) {
    valueChange(id + "." + value, "r_153");
  }

  return (
    <ul>
      <li>
        입력된 내용 : {r_153}{" "}
        <button onClick={() => removeValue("r_153")}>지우기</button>
      </li>
      <li>
        입력된 내용 : {r_153}{" "}
        <button onClick={() => removeValue("r_153")}>지우기</button>
      </li>
      <li>
        입력된 내용 : {r_153}{" "}
        <button onClick={() => removeValue("r_153")}>지우기</button>
      </li>
      {answers.map((item, idx) =>
        item.sa_content.includes("위 리스트 외의") ? (
          <li key={idx}>
            <label>
              <button
                onClick={() => onClickInsert(item.sa_id, item.sa_content, 1)}
              >
                v
              </button>
              {item.sa_content}
              <input
                type="text"
                onChange={(e) => onChangeValue(e)}
                name={item.sa_id}
              />
            </label>
          </li>
        ) : (
          <li key={idx}>
            <label>
              <button
                onClick={(e) => onClickInsert(item.sa_id, item.sa_content)}
              >
                v
              </button>
              {item.sa_content}
            </label>
          </li>
        )
      )}
    </ul>
  );
};

//질문 167번 답변
export const Qtype167 = ({ choiceNm, choiceList, changeChoice }) => {
  const [textValue, setTextValue] = React.useState("");
  const [inputItem, setInputItem] = React.useState({
    r_167: null,
    r_167_text: "",
  });
  const { r_167, r_167_text } = inputItem;

  React.useEffect(() => {
    setInputItem({
      r_167: choiceList[239].value,
      r_167_text: choiceList[240].value,
    });
  }, [choiceList]);
  React.useState(() => {
    setTextValue(choiceList[240].value);
  }, [choiceNm]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    if (name == "r_167_text") {
      setTextValue(value);
    }
    changeChoice(name, value);
  }

  return (
    <>
      <ul>
        <li>
          <label>
            <input
              type="radio"
              value={"1"}
              checked={r_167 == "1"}
              name={"r_167"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            있다
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              value={"2"}
              checked={r_167 == "2"}
              name={"r_167"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            없다
          </label>
        </li>
      </ul>
      {r_167 == "1" && (
        <ul>
          <li>
            {" "}
            약의 종류, 1일 복용 횟수(회/일) :
            <input
              type="text"
              value={textValue}
              name={"r_167_text"}
              onChange={(e) => onChangeValue(e)}
              placeholder="복용약1,2|복용약2,3|..."
            />
          </li>
        </ul>
      )}
    </>
  );
};

export const Qtype172 = ({
  answers,
  choiceNm,
  choiceList,
  valueChange,
  removeValue,
}) => {
  const [inputItem, setInputItem] = React.useState({
    r_172: null,
    r_173: null,
    r_175: null,
    r_176: null,
  });
  const { r_172, r_173, r_175, r_176 } = inputItem;
  const [textValue, setTextValue] = React.useState("");

  React.useEffect(() => {
    // console.log(choiceNm);
    // console.log(choiceList);
    setInputItem({
      r_172: choiceList[245].value,
      r_173: choiceList[246].value,
      r_175: choiceList[248].value,
      r_176: choiceList[249].value,
    });
    // console.log(r_172);
  }, [choiceList]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    setTextValue(value, choiceNm);
  }
  function onClickInsert(id, value, tag) {
    if (tag == null) {
      if (textValue != null && textValue != "") {
        valueChange(id + "." + value + ":" + textValue, choiceNm);
      } else {
        valueChange(id + "." + value + ":NA", choiceNm);
      }
    } else {
      valueChange(id + "." + value, choiceNm);
    }
    setTextValue("");
  }

  return (
    <ul>
      {choiceNm == "r_172" && (
        <li>
          입력된 내용 : {r_172}{" "}
          <button onClick={() => removeValue("r_172")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_173" && (
        <li>
          입력된 내용 : {r_173}{" "}
          <button onClick={() => removeValue("r_173")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_175" && (
        <li>
          입력된 내용 : {r_175}{" "}
          <button onClick={() => removeValue("r_175")}>지우기</button>
        </li>
      )}
      {choiceNm == "r_176" && (
        <li>
          입력된 내용 : {r_176}{" "}
          <button onClick={() => removeValue("r_176")}>지우기</button>
        </li>
      )}
      {answers.map((item, idx) =>
        item.sa_content.includes("없다") ||
        item.sa_content.includes("모르겠다") ||
        item.sa_content.includes("모름") ? (
          <li key={idx}>
            <label>
              {item.sa_content}
              <button
                onClick={() => onClickInsert(item.sa_id, item.sa_content, 1)}
              >
                v
              </button>
            </label>
          </li>
        ) : (
          <li key={idx}>
            <label>
              {item.sa_content} (
              <input
                type="text"
                onChange={(e) => onChangeValue(e)}
                name={item.sa_id}
              />{" "}
              )
              <button
                onClick={(e) => onClickInsert(item.sa_id, item.sa_content)}
              >
                v
              </button>
            </label>
          </li>
        )
      )}
    </ul>
  );
};

export const Qtype177 = ({ answers, choiceNm, choiceList, changeChoice }) => {
  const [inputItem, setInputItem] = React.useState({
    r_177: null,
    r_177_1_1_text: "",
    r_177_1_2_text: "",
    r_177_1_3_text: "",
    r_177_2_1_text: "",
    r_177_2_2_text: "",
    r_177_2_3_text: "",
    r_177_2_4_text: "",
  });
  const {
    r_177,
    r_177_1_1_text,
    r_177_1_2_text,
    r_177_1_3_text,
    r_177_2_1_text,
    r_177_2_2_text,
    r_177_2_3_text,
    r_177_2_4_text,
  } = inputItem;
  React.useEffect(() => {
    // console.log(choiceList);
    setInputItem({
      r_177: choiceList[250].value,
      r_177_1_1_text: choiceList[251].value,
      r_177_1_2_text: choiceList[252].value,
      r_177_1_3_text: choiceList[253].value,
      r_177_2_1_text: choiceList[254].value,
      r_177_2_2_text: choiceList[255].value,
      r_177_2_3_text: choiceList[256].value,
      r_177_2_4_text: choiceList[257].value,
    });
  }, [choiceList]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    changeChoice(name, value);
  }

  return (
    <>
      <ul>
        {answers.map((el, idx) =>
          el.sa_sub_id == 0 ? (
            <li key={idx}>
              <label>
                <input
                  type="radio"
                  value={el.sa_id}
                  checked={r_177 == el.sa_id}
                  name={choiceNm}
                  onChange={(e) => onChangeValue(e)}
                />
                {el.sa_content}
              </label>
            </li>
          ) : null
        )}
      </ul>
      {r_177 == 1 ? (
        <ul>
          <li>
            출산 횟수:{" "}
            <input
              type="text"
              value={r_177_1_1_text}
              onChange={(e) => onChangeValue(e)}
              name="r_177_1_1_text"
            />
          </li>
          <li>
            유산 횟수:{" "}
            <input
              type="text"
              value={r_177_1_2_text}
              onChange={(e) => onChangeValue(e)}
              name="r_177_1_2_text"
            />
          </li>
          <li>
            초산 나이:{" "}
            <input
              type="text"
              value={r_177_1_3_text}
              onChange={(e) => onChangeValue(e)}
              name="r_177_1_3_text"
            />
          </li>
        </ul>
      ) : r_177 == 5 ? (
        <ul>
          <li>
            출산 횟수:{" "}
            <input
              type="text"
              value={r_177_2_1_text}
              onChange={(e) => onChangeValue(e)}
              name="r_177_2_1_text"
            />
          </li>
          <li>
            유산 횟수:{" "}
            <input
              type="text"
              value={r_177_2_2_text}
              onChange={(e) => onChangeValue(e)}
              name="r_177_2_2_text"
            />
          </li>
          <li>
            초산 나이:{" "}
            <input
              type="text"
              value={r_177_2_3_text}
              onChange={(e) => onChangeValue(e)}
              name="r_177_2_3_text"
            />
          </li>
          <li>
            임신 주수:{" "}
            <input
              type="text"
              value={r_177_2_4_text}
              onChange={(e) => onChangeValue(e)}
              name="r_177_2_4_text"
            />
          </li>
        </ul>
      ) : null}
    </>
  );
};

export const Qtype179 = ({
  answers,
  choiceNm,
  choiceList,
  changeChoice,
  checkedChoice,
}) => {
  const [textValue, setTextValue] = React.useState("");
  const [inputItem, setInputItem] = React.useState({
    r_179: null,
    r_179_1: null,
    r_179_2: null,
    r_179_3: null,
    r_179_4: null,
    r_179_5_text: "",
    r_179_6_text: "",
    r_179_7: "",
    r_179_7_text: "",
  });
  const {
    r_179,
    r_179_1,
    r_179_2,
    r_179_3,
    r_179_4,
    r_179_5_text,
    r_179_6_text,
    r_179_7,
    r_179_7_text,
  } = inputItem;
  React.useEffect(() => {
    setInputItem({
      r_179: choiceList[259].value,
      r_179_1: choiceList[260].value,
      r_179_2: choiceList[261].value,
      r_179_3: choiceList[262].value,
      r_179_4: choiceList[263].value,
      r_179_5_text: choiceList[264].value,
      r_179_6_text: choiceList[265].value,
      r_179_7: choiceList[266].value,
      r_179_7_text: choiceList[267].value,
    });
  }, [choiceList]);
  React.useEffect(() => {
    setTextValue(choiceList[267].value);
  }, [choiceNm]);
  function onChangeValue(e) {
    const { name, value } = e.target;
    if (name == "r_179_7_text") {
      setTextValue(value);
    }
    changeChoice(name, value);
  }
  function onChangeChecked(e) {
    checkedChoice(e.target.checked, e.target.name, e.target.value);
    // console.log(e.target.checked+','+e.target.name+','+e.target.value)
  }
  return (
    <>
      <ul>
        <li>
          <label>
            <input
              type="radio"
              value={"1"}
              checked={r_179 == "1"}
              name={choiceNm}
              onChange={(e) => onChangeValue(e)}
            />
            월경 경험이 있다.
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              value={"24"}
              checked={r_179 == "24"}
              name={choiceNm}
              onChange={(e) => onChangeValue(e)}
            />
            월경 경험 없다.
          </label>
        </li>
      </ul>
      {r_179 == "1" && (
        <ul>
          <li>
            월경 규칙성
            <ul>
              {answers.map(
                (el, idx) =>
                  el.sa_sub_id == 1 && (
                    <li key={idx}>
                      <label>
                        <input
                          type="radio"
                          value={el.sa_id}
                          checked={r_179_1 == el.sa_id}
                          name={"r_179_1"}
                          onChange={(e) => onChangeValue(e)}
                        />{" "}
                        {el.sa_content.replace(/\d-\d./, "")}
                      </label>
                    </li>
                  )
              )}
            </ul>
          </li>
          <li>
            월경주기
            <ul>
              {answers.map(
                (el, idx) =>
                  el.sa_sub_id == 2 && (
                    <li key={idx}>
                      <label>
                        <input
                          type="radio"
                          value={el.sa_id}
                          checked={r_179_2 == el.sa_id}
                          name={"r_179_2"}
                          onChange={(e) => onChangeValue(e)}
                        />{" "}
                        {el.sa_content.replace(/\d-\d./, "")}
                      </label>
                    </li>
                  )
              )}
            </ul>
          </li>
          <li>
            월경량
            <ul>
              {answers.map(
                (el, idx) =>
                  el.sa_sub_id == 3 && (
                    <li key={idx}>
                      <label>
                        <input
                          type="radio"
                          value={el.sa_id}
                          checked={r_179_3 == el.sa_id}
                          name={"r_179_3"}
                          onChange={(e) => onChangeValue(e)}
                        />{" "}
                        {el.sa_content.replace(/\d-\d./, "")}
                      </label>
                    </li>
                  )
              )}
            </ul>
          </li>
          <li>
            평균 월경기간
            <ul>
              {answers.map(
                (el, idx) =>
                  el.sa_sub_id == 4 && (
                    <li key={idx}>
                      <label>
                        <input
                          type="radio"
                          value={el.sa_id}
                          checked={r_179_4 == el.sa_id}
                          name={"r_179_4"}
                          onChange={(e) => onChangeValue(e)}
                        />{" "}
                        {el.sa_content.replace(/\d-\d./, "")}
                      </label>
                    </li>
                  )
              )}
            </ul>
          </li>
          <li>
            초경 나이 :{" "}
            <input
              type="text"
              value={r_179_5_text}
              name={"r_179_5_text"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            세
          </li>
          <li>
            폐경 나이 (자연폐경 및 수술 등에 의한 폐경상태의 여성만 답변) :{" "}
            <input
              type="text"
              value={r_179_6_text}
              name={"r_179_6_text"}
              onChange={(e) => onChangeValue(e)}
            />{" "}
            세
          </li>
          <li>
            월경 전이나 월경 시 아래와 같은 증상이 있습니까? 모두 체크해
            주십시오.
            <ul>
              {answers.map(
                (el, idx) =>
                  el.sa_sub_id == 7 &&
                  (el.sa_content.includes("기타") ? (
                    <li key={idx}>
                      <label>
                        <input
                          type="checkbox"
                          value={el.sa_id}
                          checked={
                            r_179_7 != null && r_179_7.indexOf(el.sa_id) > -1
                          }
                          name={"r_179_7"}
                          onChange={(e) => onChangeChecked(e)}
                        />
                        {el.sa_content.replace(/\d-\d./, "")}
                        <input
                          type="text"
                          value={textValue}
                          name={"r_179_7_text"}
                          onChange={(e) => onChangeValue(e)}
                        />
                      </label>
                    </li>
                  ) : (
                    <li key={idx}>
                      <label>
                        <input
                          type="checkbox"
                          value={el.sa_id}
                          checked={
                            r_179_7 != null && r_179_7.indexOf(el.sa_id) > -1
                          }
                          name={"r_179_7"}
                          onChange={(e) => onChangeChecked(e)}
                        />{" "}
                        {el.sa_content.replace(/\d-\d./, "")}
                      </label>
                    </li>
                  ))
              )}
            </ul>
          </li>
        </ul>
      )}
    </>
  );
};
