import React from "react";
import axios from "axios";
import {
  Qtype00,
  Qtype01,
  Qtype04,
  Qtype10,
  Qtype15,
  Qtype20,
  Qtype51,
  Qtype52,
  Qtype55,
  Qtype75,
  Qtype130,
  Qtype131,
  Qtype138,
  Qtype151,
  Qtype153,
  Qtype167,
  Qtype172,
  Qtype177,
  Qtype179,
} from "./Qtype";

const AnswerComponent = ({
  questionNum,
  questionType,
  subId,
  choiceList,
  changeChoice,
  applyNum,
}) => {
  const [answers, setAnswers] = React.useState(null); // 질문에 해당하는 답변 리스트
  const [toggle, setToggle] = React.useState(false);
  const [choiceNm, setChoiceNm] = React.useState("");
  const [choices, setChoices] = React.useState(null);
  const [checkedItems, setCheckedItems] = React.useState(new Set());
  const [checkedText, setCheckedText] = React.useState(new Set());
  const qNum = questionNum;
  const qType = questionType;
  const [text, setText] = React.useState("");
  //해당 질문에 맞는 답변 불러오기
  React.useEffect(() => {
    loadData().then((res) => {
      if (res == "-1" || res == null) {
        setToggle(false);
      } else {
        setAnswers(res);
        const name = makeChoiceNm(questionNum, subId);
        setChoiceNm(name);
        setToggle(true);
      }
    });
  }, [qNum]);
  //checkedItems 초기화
  React.useEffect(() => {
    for (let el of choiceList) {
      if (el.id == choiceNm) {
        // console.log(el.value);
        initalCheckedItems(el.value);
      }
    }
  }, [choiceNm]);

  async function loadData() {
    const res = await axios.post(process.env.REACT_APP_API + "/tmp/answer", {
      q_num: qNum,
    });
    return res.data;
  }

  function makeChoiceNm(id, sub_id) {
    let name = "";
    if (sub_id != "" && sub_id != null) {
      name += "r_" + id + "_" + sub_id;
    } else {
      name += "r_" + id;
    }
    return name;
  }

  //체크박스 답변용
  function checkedChoice(checked, key, value) {
    //check된 아이템들 담기
    if (checked == true) {
      checkedItems.add(value);
    } else if (checked == false && checkedItems.has(value)) {
      checkedItems.delete(value);
    }
    // console.log(checkedItems);
    //text로 변환 DB 저장 하려고
    let txt = "";
    if (checkedItems.size > 0) {
      for (let el of checkedItems) {
        txt += el + ",";
      }
    }
    //출력용 변수에 저장
    changeChoice(key, txt);
  }

  //체크박스 초기화
  function initalCheckedItems(value) {
    if (checkedItems.size == 0) {
      if (value != null && value.length > 1) {
        let part = value.split(",");
        for (let el of part) {
          if (el != null && el != "") {
            checkedItems.add(el.replace(/\s/g, ""));
          }
        }
        setCheckedItems(checkedItems);
      }
    }
  }

  function valueChange(values, choiceNm) {
    // console.log(values);
    if (!checkedText.has(values)) {
      checkedItems.add(values);
    }
    var txt = "";
    for (var item of checkedItems) {
      if (txt == "") {
        txt += item;
      } else {
        txt += "," + item;
      }
    }
    changeChoice(choiceNm, txt);
    setText(txt);
  }

  function removeValue(choiceNm) {
    var txt = text;
    if (txt != "" && txt.indexOf(",") > -1) {
      var lastIdx = txt.lastIndexOf(",");
      checkedItems.delete(txt.slice(lastIdx + 1, txt.length));
      txt = txt.slice(0, lastIdx);
    } else if (txt != "" && txt.indexOf(",") == -1 && txt.length > 0) {
      txt = "";
      checkedItems.clear();
    }
    changeChoice(choiceNm, txt);
    setText(txt);
  }

  return (
    <div>
      {toggle && qType == 1 && (
        <Qtype01
          answers={answers}
          choiceNm={choiceNm}
          choiceList={choiceList}
          changeChoice={changeChoice}
          applyNum={applyNum}
        />
      )}
      {toggle && qType == 4 && (
        <Qtype04
          answers={answers}
          choiceNm={choiceNm}
          subId={subId}
          choiceList={choiceList}
          changeChoice={changeChoice}
        />
      )}
      {toggle && qType == 10 && (
        <Qtype10
          answers={answers}
          choiceNm={choiceNm}
          choiceList={choiceList}
          changeChoice={changeChoice}
        />
      )}
      {toggle &&
        (choiceNm == "r_15" ||
          choiceNm == "r_15_1" ||
          choiceNm == "r_15_2" ||
          choiceNm == "r_16" ||
          choiceNm == "r_16_1" ||
          choiceNm == "r_16_2" ||
          choiceNm == "r_17" ||
          choiceNm == "r_17_1" ||
          choiceNm == "r_17_2" ||
          choiceNm == "r_18" ||
          choiceNm == "r_18_1" ||
          choiceNm == "r_18_2" ||
          choiceNm == "r_19" ||
          choiceNm == "r_19_1" ||
          choiceNm == "r_19_2") && (
          <Qtype15
            answers={answers}
            choiceNm={choiceNm}
            subId={subId}
            choiceList={choiceList}
            changeChoice={changeChoice}
          />
        )}
      {toggle && qType == 20 && (
        <Qtype20 choiceList={choiceList} changeChoice={changeChoice} />
      )}
      {toggle && qType == 51 && (
        <Qtype51
          answers={answers}
          choiceNm={choiceNm}
          choiceList={choiceList}
          valueChange={valueChange}
          removeValue={removeValue}
        />
      )}
      {toggle && qType == 52 && (
        <Qtype52
          answers={answers}
          choiceNm={choiceNm}
          subID={subId}
          choiceList={choiceList}
          changeChoice={changeChoice}
          checkedChoice={checkedChoice}
        />
      )}
      {toggle && qType == 55 && (
        <Qtype55
          answers={answers}
          choiceNm={choiceNm}
          choiceList={choiceList}
          valueChange={valueChange}
          removeValue={removeValue}
        />
      )}
      {toggle && qType == 75 && (
        <Qtype75
          answers={answers}
          choiceNm={choiceNm}
          choiceList={choiceList}
          changeChoice={changeChoice}
        />
      )}
      {toggle && qType == 130 && (
        <Qtype130
          answers={answers}
          choiceNm={choiceNm}
          subID={subId}
          choiceList={choiceList}
          changeChoice={changeChoice}
        />
      )}
      {toggle && qType == 131 && (
        <Qtype131
          answers={answers}
          choiceNm={choiceNm}
          subID={subId}
          choiceList={choiceList}
          changeChoice={changeChoice}
        />
      )}
      {toggle && qType == 138 && (
        <Qtype138
          answers={answers}
          choiceNm={choiceNm}
          choiceList={choiceList}
          changeChoice={changeChoice}
        />
      )}
      {toggle && qType == 151 && (
        <Qtype151
          answers={answers}
          choiceNm={choiceNm}
          choiceList={choiceList}
          changeChoice={changeChoice}
          checkedChoice={checkedChoice}
        />
      )}
      {toggle && qType == 153 && (
        <Qtype153
          answers={answers}
          choiceNm={choiceNm}
          choiceLi
          st={choiceList}
          valueChange={valueChange}
          removeValue={removeValue}
        />
      )}
      {toggle && qType == 167 && (
        <Qtype167
          choiceNm={choiceNm}
          choiceList={choiceList}
          changeChoice={changeChoice}
        />
      )}
      {toggle && qType == 172 && (
        <Qtype172
          answers={answers}
          choiceNm={choiceNm}
          choiceLi
          st={choiceList}
          valueChange={valueChange}
          removeValue={removeValue}
        />
      )}
    </div>
  );
};

function AnswerType(props) {
  // console.log(props.qType +'='+typeof props.qType+':'+props.choiceNm);
  const qType = props.qType.toString();
  // console.log(props.qNum+','+qType+','+props.choiceNm);
  if (qType === "1") {
    return (
      <Qtype01
        answers={props.answers}
        choiceNm={props.choiceNm}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "4") {
    return (
      <Qtype04
        answers={props.answers}
        choiceNm={props.choiceNm}
        subId={props.subID}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "10") {
    return (
      <Qtype10
        answers={props.answers}
        choiceNm={props.choiceNm}
        hoiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "15") {
    if (
      props.choiceNm == "r_15" ||
      props.choiceNm == "r_15_1" ||
      props.choiceNm == "r_15_2" ||
      props.choiceNm == "r_16" ||
      props.choiceNm == "r_16_1" ||
      props.choiceNm == "r_16_2" ||
      props.choiceNm == "r_17" ||
      props.choiceNm == "r_17_1" ||
      props.choiceNm == "r_17_2" ||
      props.choiceNm == "r_18" ||
      props.choiceNm == "r_18_1" ||
      props.choiceNm == "r_18_2" ||
      props.choiceNm == "r_19" ||
      props.choiceNm == "r_19_1" ||
      props.choiceNm == "r_19_2"
    ) {
      return (
        <Qtype15
          answers={props.answers}
          choiceNm={props.choiceNm}
          subId={props.subID}
          choiceList={props.choiceList}
          changeChoice={props.changeChoice}
        />
      );
    } else {
      return null;
    }
  } else if (qType === "20") {
    return (
      <Qtype20
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "51") {
    return (
      <Qtype51
        answers={props.answers}
        choiceNm={props.choiceNm}
        qNum={props.qNum}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
        checkedChoice={props.checkedChoice}
      />
    );
  } else if (qType === "52") {
    return (
      <Qtype52
        answers={props.answers}
        choiceNm={props.choiceNm}
        subID={props.subID}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
        checkedChoice={props.checkedChoice}
      />
    );
  } else if (qType === "55") {
    return (
      <Qtype51
        answers={props.answers}
        choiceNm={props.choiceNm}
        qNum={props.qNum}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
        checkedChoice={props.checkedChoice}
      />
    );
  } else if (qType === "75") {
    return (
      <Qtype75
        answers={props.answers}
        choiceNm={props.choiceNm}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "130") {
    return (
      <Qtype130
        answers={props.answers}
        choiceNm={props.choiceNm}
        subID={props.subID}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "131") {
    return (
      <Qtype131
        answers={props.answers}
        choiceNm={props.choiceNm}
        subID={props.subID}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "138") {
    return (
      <Qtype138
        answers={props.answers}
        choiceNm={props.choiceNm}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "151") {
    return (
      <Qtype151
        answers={props.answers}
        choiceNm={props.choiceNm}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
        checkedChoice={props.checkedChoice}
      />
    );
  } else if (qType === "167") {
    return (
      <Qtype167
        choiceNm={props.choiceNm}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "177") {
    return (
      <Qtype177
        answers={props.answers}
        choiceNm={props.choiceNm}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
      />
    );
  } else if (qType === "179") {
    return (
      <Qtype179
        answers={props.answers}
        choiceNm={props.choiceNm}
        choiceList={props.choiceList}
        changeChoice={props.changeChoice}
        checkedChoice={props.checkedChoice}
      />
    );
  } else {
    return <Qtype00 answers={props.answers} />;
  }
}

export default AnswerComponent;
