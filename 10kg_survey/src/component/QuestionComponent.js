import React from "react";

const QuestionComponent = ({ toggle, qList, choiceList, changeChoice }) => {
  return (
    <section>
      {toggle && (
        <div>
          {qList.map((item, idx) => (
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
                choiceList={choiceList}
                changeChoice={changeChoice}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default QuestionComponent;
