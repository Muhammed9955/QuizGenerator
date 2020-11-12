import "./App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Checkbox,
  Segment,
  Form,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { useState } from "react";
import { football, Geography } from "./questionsStore";

function App() {
  const queasionsTypesIntialState = {
    easyQuestionsCount: 0,
    mediumQuestionsCount: 0,
    hardQuestionsCount: 0,
  };
  const [state, setState] = useState({});
  const [questionsStore, setQuestionsStore] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [modifiedQuestion, setModifiedQuestion] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [questionIndex, setQuestionIndex] = useState("");
  // const [easyMark, setEasyMark] = useState(20)
  // const [mediumMark, setMediumMark] = useState(50)
  // const [hardMark, setHardMark] = useState(30)
  const [queasionsTypes, setQueasionsTypes] = useState(
    queasionsTypesIntialState
  );
  const copyFootball1 = [...football];
  const copyFootball2 = [...football];
  const copyGeography1 = [...Geography];
  const copyGeography2 = [...Geography];
  const compinedQuizFootball = [
    ...copyFootball1.splice(0, 4),
    ...copyGeography1.splice(4, 10),
  ];
  const compinedQuizGeography = [
    ...copyGeography2.splice(0, 4),
    ...copyFootball2.splice(4, 10),
  ];
  // console.log({football})
  // console.log({Geography})

  const handleChange = (e, { value }) => {
    setState({ value });
    console.log({ value });
  };
  const handleChangeQuestion = (e) => {
    setModifiedQuestion({ text: e.target.value, questionIndex });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newquestionsStore = questionsStore.map((q, indx) =>
      indx == questionIndex ? { ...q, text: modifiedQuestion.text } : q
    );
    setQuestionsStore([...newquestionsStore]);
    setShowEditForm(false);
  };

  const showQuestionsFunc = () => {
    if (!state?.value) {
      alert("please select a topic first");
    } else {
      setShowQuestions(true);
    }
  };
  const restQuestions = () => {
    setShowQuestions(false);
  };
  const getQuestionsStore = () => {
    if (state.value === "Geography") {
      setQuestionsStore([...Geography]);
    } else if (state.value === "football") {
      setQuestionsStore([...football]);
    } else if (state.value === "compinedFootball") {
      setQuestionsStore([...compinedQuizFootball]);
    } else if (state.value === "compinedGeography") {
      setQuestionsStore([...compinedQuizGeography]);
    }
  };
  const deleteQuestion = (index) => {
    console.log({ index });
    const newquestionsStore = questionsStore.filter((q, indx) => indx != index);
    console.log({ newquestionsStore });
    setQuestionsStore([...newquestionsStore]);
  };
  const editQuetion = (index) => {
    const newquestionsStore = questionsStore.map((q, indx) => indx != index);
    setQuestionsStore([...newquestionsStore]);
  };

  // const getQuestionsTypes = () => {
  //   questionsStore.map(q =>{
  //     // console.log({q})
  //     // console.log("difficulty",q.difficulty)
  //     if( q.difficulty == "easy") {
  //     setQueasionsTypes({...queasionsTypes,easyQuestionsCount: queasionsTypes.easyQuestionsCount + 1})
  //     } else if (q.difficulty == "medium") {
  //     setQueasionsTypes({...queasionsTypes,mediumQuestionsCount: queasionsTypes.mediumQuestionsCount + 1})
  //     } else {
  //     setQueasionsTypes({...queasionsTypes,hardQuestionsCount: queasionsTypes.hardQuestionsCount + 1})
  //     }
  //   })
  // }
  // getQuestionsTypes()
  // console.log({queasionsTypes})
  // console.log({showQuestions})
  // console.log({state})
  // console.log({questionsStore})
  console.log({ modifiedQuestion });
  return (
    <div className="app">
      <Segment className="app_header">
        <Form>
          <h3>Quiz</h3>
          <Form.Field>Selected quiz criteria:</Form.Field>
          <Form.Field>
            <Checkbox
              label="football topic"
              name="football"
              value="football"
              onChange={handleChange}
              checked={state.value === "football"}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Geography topic"
              name="Geography"
              value="Geography"
              onChange={handleChange}
              checked={state.value === "Geography"}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="compined quiz , 60% football & 40% geography"
              name="compinedFootball"
              value="compinedFootball"
              onChange={handleChange}
              checked={state.value === "compinedFootball"}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="compined quiz , 40% football & 60% geography"
              name="compinedGeography"
              value="compinedGeography"
              onChange={handleChange}
              checked={state.value === "compinedGeography"}
            />
          </Form.Field>
        </Form>
      </Segment>
      <Segment raised>
        {!showQuestions && (
          <h4 style={{ color: "red" }}>
            select quiz criteria from above then click on Generate Question
            Paper to make new quiz{" "}
          </h4>
        )}
        {showEditForm && (
          <Form>
            <Form.Field>
              <input
                placeholder={modifiedQuestion.text}
                value={modifiedQuestion.text}
                // value={modifiedQuestion}
                onChange={(e) => handleChangeQuestion(e)}
              />
            </Form.Field>
            <Button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </Form>
        )}
        {showQuestions &&
          questionsStore.length > 0 &&
          questionsStore.map((q, index) => (
            <h4>
              - {q.text}
              (marks:{q.marks}).{" "}
              <Icon
                color="green"
                name="edit"
                onClick={() => {
                  setShowEditForm(true);
                  setQuestionIndex(index);
                  setModifiedQuestion({ ...modifiedQuestion, text: q.text });
                }}
              />
              <Icon
                color="red"
                name="delete"
                onClick={() => deleteQuestion(index)}
              />
            </h4>
          ))}
      </Segment>

      <Button
        primary
        onClick={() => {
          showQuestionsFunc();
          getQuestionsStore();
        }}
      >
        Generate Questions Paper
      </Button>
      <Button color="black" onClick={restQuestions} style={{ margin: 20 }}>
        Rest
      </Button>
    </div>
  );
}

export default App;
