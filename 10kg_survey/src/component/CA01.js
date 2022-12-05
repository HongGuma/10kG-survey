import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AnswerComponent from "./AnswerComponent";

const Pagination = ({ numbers, setNum }) => {
  function clickNum(num) {
    setNum(num);
  }

  return (
    <div className="pagination">
      <ul>
        {numbers.map((el, idx) => (
          <li key={idx} onClick={() => clickNum(idx + 1)}>
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CA01 = ({ match }) => {
  const [applyNum] = React.useState(match.params.applyNum);
  const history = useHistory();
  const [toggle, setToggle] = React.useState(false);
  const [qaToggle, setQAtoggle] = React.useState(false);

  const [categoryList, setCategoryList] = React.useState([]); //전체 카테고리 리스트 (완전한 상태) - 텍스트만
  const [currentCategory, setCurrentCategory] = React.useState(null); //현재 보여지는 카테고리 (>    분할된 상태)
  const [currentCategoryNum, setCurrentCaNum] = React.useState(1); //현재 카테고리 번호
  const nextCategoryIdx = currentCategoryNum * 1; //다음 카테고리 번호
  const preCategoryIdx = nextCategoryIdx - 1; //이전 카테고리 번호

  const [questions, setQuestions] = React.useState(null); // 질문 리스트
  const [choices, setChoices] = React.useState([]); // 선택한 답변 리스트
  const [checkedItems, setCheckedItems] = React.useState(new Set());

  //카테고리 불러오기
  React.useEffect(() => {
    loadCategory().then((res) => {
      if (res == "-1" || res.length == 0) {
        setToggle(false);
      } else {
        for (let el of res) {
          const txt = el.ca_name + "(" + el.ca_name_en + ")";
          categoryList.push(txt);
        }
        setCategoryList(categoryList);
        setCurrentCategory(categoryList.slice(preCategoryIdx, nextCategoryIdx));
        setToggle(true);
      }
    });
    //선택한 답변 불러오기
    loadChoices().then((res) => {
      if (res != "-1" && res != null) {
        for (let el of res) {
          for (let i in el) {
            choices.push({ id: i, value: el[i] });
          }
        }
      }
      setChoices(choices);
    });
  }, []);
  //질문 불러오기 카테고리 번호가 바뀔때 마다
  React.useEffect(() => {
    loadQuestion().then((res) => {
      if (res == "-1" || res.length == 0) {
        setQAtoggle(false);
      } else {
        setQuestions(res);
        setQAtoggle(true);
      }
    });
  }, [currentCategoryNum]);
  //현재 카테고리
  React.useEffect(() => {
    setCurrentCategory(categoryList.slice(preCategoryIdx, nextCategoryIdx));
  }, [currentCategoryNum]);

  /* 데이터 불러오는 함수 */
  async function loadCategory() {
    const res = await axios.post(process.env.REACT_APP_API + "/tmp/category");
    return res.data;
  }

  async function loadQuestion() {
    const res = await axios.post(process.env.REACT_APP_API + "/tmp/question", {
      ca_num: currentCategoryNum,
    });
    return res.data;
  }

  async function loadChoices() {
    const res = await axios.post(
      process.env.REACT_APP_API + "/tmp/load/choices",
      { applyNum: applyNum }
    );
    return res.data;
  }

  //카테고리 넘버 변경
  function changeCategoryNum(num) {
    setCurrentCaNum(num);
  }

  //다음 카테고리
  function onNext() {
    setCurrentCaNum(currentCategoryNum + 1);
  }

  //이전 카테고리
  function onPrev() {
    setCurrentCaNum(currentCategoryNum - 1);
  }

  //이전 화면으로 이동
  function goToBack() {
    history.push("/tmp/00/" + applyNum);
  }

  //선택한 답변 변경
  function changeChoice(key, value) {
    setChoices(
      choices.map((item) => (item.id == key ? { ...item, value: value } : item))
    );
    // console.log(choices);
  }

  //체크박스 답변용
  function checkedChoice(checked, key, value) {
    //check된 아이템들 담기
    if (checked == true) {
      checkedItems.add(value);
    } else if (checked == false && checkedItems.has(value)) {
      checkedItems.delete(value);
    }
    // console.log("checkedItems:"+checkedItems);
    //text로 변환 DB 저장 하려고
    let txt = "";
    if (checkedItems.size > 0) {
      checkedItems.sort();
      for (let el of checkedItems) {
        txt += el + ", ";
      }
    }
    //출력용 변수에 저장
    setCheckedItems(checkedItems);
    setChoices(
      choices.map((item) => (item.id == key ? { ...item, value: txt } : item))
    );
    // console.log("choices:"+choices);
  }

  //체크박스 초기화
  function initalCheckbox(txt) {
    if (checkedItems.size == 0) {
      if (txt.length > 1) {
        let part = txt.split(",");
        for (let el of part) {
          if (el != null && el != "") {
            checkedItems.add(el);
          }
        }
        setCheckedItems(checkedItems);
      }
    }
  }

  //선택한 답변 저장하기
  async function saveChoice() {
    if (window.confirm("저장 하시겠습니까?")) {
      const res = await axios.post(
        process.env.REACT_APP_API + "/tmp/save/choices",
        {
          applyNum: applyNum,
          choices: choices,
        }
      );
      if (res.data == "-1") {
        //서버 문제
        alert("error! 저장실패 관리자에게 문의하세요.");
      } else {
        alert("저장 완료.");
      }
    }
  }

  return (
    <div className="">
      <div className="top-move-btn">
        <div className="btn">
          <button onClick={goToBack}>뒤로가기</button>
          카테고리 번호 :{" "}
          <Pagination numbers={categoryList} setNum={changeCategoryNum} />
          {/*( KU10K 번호 : )*/}
        </div>
      </div>
      {toggle && (
        <div className="main-print-area">
          <div className="category">
            <p>
              {currentCategoryNum}. {currentCategory}
            </p>
          </div>
          <section>
            {qaToggle && (
              <div>
                {questions.map((item, idx) => (
                  <div key={idx}>
                    {item.sub_id != null ? (
                      <div>
                        {item.id}-{item.sub_id}.{item.question}
                      </div>
                    ) : (
                      <div>
                        {item.id}.{item.question}
                      </div>
                    )}
                    <AnswerComponent
                      questionNum={item.id}
                      questionType={item.question_type}
                      subId={item.sub_id}
                      choiceList={choices}
                      changeChoice={changeChoice}
                      applyNum={applyNum}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
      <div className="bottom-move-btn">
        <div className="btn">
          {preCategoryIdx > 0 && <button onClick={onPrev}>이전</button>}
          <button className="save-btn" onClick={saveChoice}>
            저장
          </button>
          {nextCategoryIdx < 15 && <button onClick={onNext}>다음</button>}
        </div>
      </div>
    </div>
  );
};

export default CA01;
