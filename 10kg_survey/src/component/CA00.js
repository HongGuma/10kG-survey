import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CA00 = ({ match }) => {
  const history = useHistory();
  const [applyNum] = React.useState(match.params.applyNum);
  const [checked, setChecked] = React.useState(false);
  const [KU10K, setKU10K] = React.useState(null);
  const [inputItems, setItems] = React.useState({
    //데이터 입력시 사용하는 set
    r_0_1: "",
    r_0_2: null,
    r_0_3: "",
    r_0_4: 0,
    r_0_5: null,
    r_0_6: "",
    r_0_7: "",
    r_0_8: "",
    r_0_9: "",
    r_0_10: null,
    r_0_11: "",
    r_0_12: null,
    r_0_13: "",
    r_0_14: "",
    r_0_15: "",
    r_0_16: "",
  });
  const {
    r_0_1,
    r_0_2,
    r_0_3,
    r_0_4,
    r_0_5,
    r_0_6,
    r_0_7,
    r_0_8,
    r_0_9,
    r_0_10,
    r_0_11,
    r_0_12,
    r_0_13,
    r_0_14,
    r_0_15,
    r_0_16,
  } = inputItems; //비구조화 할당...?

  // const [value,setValue] = React.useState('');
  React.useEffect(() => {
    loadKU10K().then((res) => {
      if (res == "-1" || res.length == 0) {
        setKU10K(null);
      } else {
        setKU10K(res[0].KU10K_no);
      }
    });
    loadChoices().then((res) => {
      if (res != null || res.length > 0) {
        setItems({
          r_0_1: res[0].r_0_1,
          r_0_2: res[0].r_0_2,
          r_0_3: res[0].r_0_3,
          r_0_4: res[0].r_0_4,
          r_0_5: res[0].r_0_5,
          r_0_6: res[0].r_0_6,
          r_0_7: res[0].r_0_7,
          r_0_8: res[0].r_0_8,
          r_0_9: res[0].r_0_9,
          r_0_10: res[0].r_0_10,
          r_0_11: res[0].r_0_11,
          r_0_12: res[0].r_0_12,
          r_0_13: res[0].r_0_13,
          r_0_14: res[0].r_0_14,
          r_0_15: res[0].r_0_15,
          r_0_16: res[0].r_0_16,
        });
      }
    });
  }, []);

  async function loadKU10K() {
    const res = await axios.post(
      process.env.REACT_APP_API + "/tmp/load/ku10k_num",
      { apply_num: applyNum }
    );
    return res.data;
  }

  async function loadChoices() {
    const res = await axios.post(
      process.env.REACT_APP_API + "/tmp/load/basicInfo",
      { applyNum: applyNum }
    );
    return res.data;
  }

  async function insertChoices() {
    const res = await axios.post(
      process.env.REACT_APP_API + "/tmp/save/basicInfo",
      {
        applyNum: applyNum,
        choices: inputItems,
      }
    );
    if (res.data == "-1") {
      alert("error! 데이터 저장 실패");
      return "-1";
    } else {
      return "0";
    }

    function onChangeValue(e) {
      const { name, value } = e.target;
      // console.log(name,value)
      if (name == "r_0_2" || name == "r_0_3") {
        if (r_0_4 == 0) {
          setItems({ ...inputItems, [name]: value });
        } else {
          setItems({ ...inputItems, r_0_2: null, r_0_3: "" });
        }
      } else {
        setItems({ ...inputItems, [name]: value });
      }

      if (name == "r_0_4" && e.target.checked) {
        setItems({ ...inputItems, r_0_2: null, r_0_3: "" });
      }
    }

    function onChangeChecked(e) {
      if (e.target.checked) {
        setItems({ ...inputItems, r_0_4: 1 });
      } else {
        setItems({ ...inputItems, r_0_4: 0 });
      }
    }

    function onNext() {
      const res = insertChoices();
      res.then((r) => {
        if (r == "0") {
          history.push("/tmp/01/" + applyNum);
        }
      });
    }

    function onSave() {
      const res = insertChoices();
      res.then((r) => {
        if (r == "0") {
          alert("저장되었습니다.");
        }
      });
    }

    function onPrev() {
      history.push("/");
    }

    return (
      <div className="apply-info-wrap">
        <div>참가자 번호 : {applyNum}</div>
        <div>
          KU10K 번호 : {KU10K != null && KU10K != undefined ? KU10K : null}
        </div>
        {/*<div><button onClick={loadChoices}>불러오기</button></div>*/}
        <div className="header">
          참여자 기초 정보 (Basic demographic information)
        </div>
        <div className="category-00">
          <ul className="cont-01">
            <li>생년월일</li>
            <li>
              <input
                type="text"
                name="r_0_1"
                value={r_0_1 || ""}
                onChang
                e={(e) => onChangeValue(e)}
              />
            </li>
          </ul>
          <ul className="cont-01">
            <li>태어난 시간</li>
            <li>
              <label>
                <input
                  type="radio"
                  value={1}
                  checked={r_0_2 == 1}
                  name="r_0_2"
                  onC
                  hange={(e) => onChangeValue(e)}
                />
                오전
              </label>
              <label>
                <input
                  type="radio"
                  value={2}
                  checked={r_0_2 == 2}
                  name="r_0_2"
                  onC
                  hange={(e) => onChangeValue(e)}
                />
                오후
              </label>
            </li>
            <li>
              <input
                type="text"
                value={r_0_3}
                name="r_0_3"
                onChange={(e) => onChangeValue(e)}
                placeholder="00:00 형식으로 입력해주세요"
              />
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="r_0_4"
                  checked={r_0_4 == 1}
                  onChange={(e) => onChangeChecked(e)}
                />
                모름
              </label>
            </li>
          </ul>
          <ul className="cont-01">
            <li>성별</li>
            <li>
              <label>
                <input
                  type="radio"
                  value={1}
                  checked={r_0_5 == 1}
                  name="r_0_5"
                  onC
                  hange={(e) => onChangeValue(e)}
                />
                남
              </label>
              <label>
                <input
                  type="radio"
                  value={2}
                  checked={r_0_5 == 2}
                  name="r_0_5"
                  onC
                  hange={(e) => onChangeValue(e)}
                />
                여
              </label>
              <label>
                <input
                  type="radio"
                  value={0}
                  checked={r_0_5 == 0}
                  name="r_0_5"
                  onC
                  hange={(e) => onChangeValue(e)}
                />
                모름
              </label>
            </li>
          </ul>
          <ul className="cont-01">
            <li>성씨 및 본관</li>
            <li className="cont-03">
              <div>
                <div>
                  본인 성씨
                  <input
                    type="text"
                    value={r_0_6}
                    name="r_0_6"
                    onChange={(e) => onChangeValue(e)}
                  />
                  본관
                  <input
                    type="text"
                    value={r_0_7}
                    name="r_0_7"
                    onChange={(e) => onChangeValue(e)}
                  />
                </div>
                <div>
                  어머니 성씨
                  <input
                    type="text"
                    value={r_0_8}
                    name="r_0_8"
                    onChange={(e) => onChangeValue(e)}
                  />
                  본관
                  <input
                    type="text"
                    value={r_0_9}
                    name="r_0_9"
                    onChange={(e) => onChangeValue(e)}
                  />
                </div>
              </div>
            </li>
          </ul>
          <ul className="cont-01">
            <li>동거 형태</li>
            <li>
              <label>
                <input
                  type="radio"
                  value="1"
                  checked={r_0_10 == "1"}
                  name="r_0_10"
                  onChange={(e) => onChangeValue(e)}
                />
                독거
              </label>
              <label>
                <input
                  type="radio"
                  value="2"
                  checked={r_0_10 == "2"}
                  name="r_0_10"
                  onChange={(e) => onChangeValue(e)}
                />
                동거
              </label>
            </li>
          </ul>
          <ul className="cont-01">
            <li>직업</li>
            <li>
              <input
                type="text"
                value={r_0_11}
                name="r    _0_11"
                onChange={(e) => onChangeValue(e)}
              />
            </li>
          </ul>
          <ul className="cont-01">
            <li>교육 정도</li>
            <li>
              <label>
                <input
                  type="radio"
                  value={1}
                  checked={r_0_12 == 1}
                  name="r_0_12"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                초졸 이하
              </label>
              <label>
                <input
                  type="radio"
                  value={2}
                  checked={r_0_12 == 2}
                  name="r_0_12"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                중졸
              </label>
              <label>
                <input
                  type="radio"
                  value={3}
                  checked={r_0_12 == 3}
                  name="r_0_12"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                고졸
              </label>
              <label>
                <input
                  type="radio"
                  value={4}
                  checked={r_0_12 == 4}
                  name="r_0_12"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                대졸
              </label>
              <label>
                <input
                  type="radio"
                  value={5}
                  checked={r_0_12 == 5}
                  name="r_0_12"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                석사
              </label>
              <label>
                <input
                  type="radio"
                  value={6}
                  checked={r_0_12 == 6}
                  name="r_0_12"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                박사
              </label>
            </li>
          </ul>
          <ul className="cont-01">
            <li>가족 관계</li>
            <li className="cont-02">
              <div>
                형제{" "}
                <input
                  type="text"
                  value={r_0_13}
                  name="r_0_13"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                명
              </div>
              <div>
                자매{" "}
                <input
                  type="text"
                  value={r_0_14}
                  name="r_0_14"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                명
              </div>
              <div>
                아들{" "}
                <input
                  type="text"
                  value={r_0_15}
                  name="r_0_15"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                명
              </div>
              <div>
                딸{" "}
                <input
                  type="text"
                  value={r_0_16}
                  name="r_0_16"
                  onChange={(e) => onChangeValue(e)}
                />{" "}
                명
              </div>
            </li>
          </ul>
        </div>

        <div className="btn">
          <button onClick={onPrev}>이전</button>
          <button className="save-btn" onClick={onSave}>
            저장
          </button>
          <button onClick={onNext}>다음</button>
        </div>
      </div>
    );
  }
};

export default CA00;
