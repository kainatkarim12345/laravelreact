import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const SurveyForm = () => {
  const [name, setName] = useState("");
  const [survey_type, setSurveyType] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [timer_duration, setTimerDuration] = useState("");
  const [price_within_timer, setPriceWithinTimer] = useState("");
  const [price_without_timer, setPriceWithoutTimer] = useState("");
  const [expire_at, setExpireAt] = useState("");
  const [showTimeDuration, setShowTimeDuration] = useState(false);
  const {
    addsurvey,
    errors,
    user,
    status,
    setErrors,
    getQuestions,
    questions,
  } = useAuthContext();


  const handleCheckboxChange = (questionId) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
    }
  };

  const handleSurveyTypeChange = (event) => {
    const selectedSurveyType = event.target.value;
    setSurveyType(selectedSurveyType);

    if (selectedSurveyType === "survey") {
      setShowTimeDuration(true);
    } else {
      setShowTimeDuration(false);
    }

    getQuestions(selectedSurveyType);
  };

  const handleSurvey = async (event) => {
    event.preventDefault();
    alert();
    // addsurvey();
  };

  useEffect(() => {
    if (!questions) {
      getQuestions();
    }
  }, []);

  return (
    <section className="bg-[#F4F7FF] py-10 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div
              className="
                    relative
                    mx-auto
                    max-w-[1200px]
                    overflow-hidden
                    rounded-lg
                    bg-white
                    py-9
                   
                    text-center
                    sm:px-12
                    md:px-[60px]
                    "
            >
              <div className="mb-10 text-center md:mb-16">
                <h1 className="text-2xl md:text-4xl font-bold">
                  Create Survey
                </h1>
              </div>
              <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                  <Link
                    to="/questionform"
                    className="block rounded py-2 pr-4 pl-3 bg-white text-[#4338CA]"
                    aria-current="page"
                  >
                    Add Question
                  </Link>
                  <div className="hidden w-full md:block md:w-auto">
                    <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                      <li>
                        <p className="block rounded py-2 pr-4 pl-3 text-white">
                          Add by {user?.name}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div
                className="
                    relative
                    mx-auto
                    max-w-[1000px]
                    overflow-hidden
                    rounded-lg
                    bg-white
                    py-2
                   
                    text-center
                    sm:px-12
                    md:px-[60px]
                    "
              >
                <form onSubmit={handleSurvey}>
                  <div className="mb-4 py-5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Survey Name"
                      className="
                            bordder-[#E9EDF4]
                            w-full
                            rounded-md
                            border
                            bg-[#FCFDFE]
                            py-3
                            px-5
                            text-base text-body-color
                            placeholder-[#76787a]
                            outline-none
                            focus:border-primary
                            focus-visible:shadow-none
                        "
                    />
                    {errors.name && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mb-8">
                    <p className="text-left text-sm font-medium text-slate-700">
                      Survey type
                    </p>

                    <select
                      value={survey_type}
                      onChange={handleSurveyTypeChange}
                      className="
                            bordder-[#E9EDF4]
                            w-full
                            rounded-md
                            border
                            bg-[#FCFDFE]
                            py-3
                            px-5
                            text-base text-body-color
                            placeholder-[#76787a]
                            outline-none
                            focus:border-primary
                            focus-visible:shadow-none
                        "
                    >
                      <option value={""}>Select Type</option>
                      <option value={"profile"}>Profile</option>
                      <option value={"survey"}>Survey</option>
                    </select>
                    {errors.survey_type && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.survey_type[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {survey_type !== "" && (
                    <div className="mb-4 md:mb-16">
                      <div className="mb-10 text-center md:mb-16">
                        <h3 className="text-1xl md:text-3xl font-bold">
                          Select Questions for {survey_type}
                        </h3>
                      </div>
                      <p className="text-left text-lg font-medium text-slate-900"></p>
                      <table className="table-auto w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Select</th>
                            <th className="px-4 py-2">Question</th>
                            <th className="px-4 py-2">Options</th>
                          </tr>
                        </thead>
                        <tbody>
                          {questions.map((question, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2">
                                <input
                                  type="checkbox"
                                  id={`question-${index}`}
                                  value={question.question_id}
                                  checked={selectedQuestions.includes(
                                    question.question_id
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(question.question_id)
                                  }
                                  className="mr-2"
                                />
                              </td>
                              <td className="border px-4 py-2">
                                {question.question}
                              </td>
                              <td className="border px-4 py-2">
                                {question.question_type === "Text Field" && (
                                  <input
                                    type="text"
                                    className="border px-4 py-2"
                                    placeholder="Write here"
                                  />
                                )}
                                {question.question_type === "MCQs" && (
                                  <div>
                                    {question.options ? (
                                      question.options.map(
                                        (option, optionIndex) => (
                                          <div
                                            key={optionIndex}
                                            className="text-left"
                                          >
                                            <input
                                              type="radio"
                                              id={`option-${optionIndex}`}
                                              name={`question-${index}-options`}
                                              value={option}
                                            />
                                            <label
                                              htmlFor={`option-${optionIndex}`}
                                            >
                                              {option}
                                            </label>
                                          </div>
                                        )
                                      )
                                    ) : (
                                      <span>No options available</span>
                                    )}
                                  </div>
                                )}
                                {question.question_type === "True/False" && (
                                  <div className="text-left">
                                    <input
                                      type="radio"
                                      id={`true-option`}
                                      name={`question-${index}-options`}
                                      value="True"
                                    />
                                    <label htmlFor={`true-option`}>True </label>
                                    <input
                                      type="radio"
                                      id={`false-option`}
                                      name={`question-${index}-options`}
                                      value="False"
                                    />
                                    <label htmlFor={`false-option`}>
                                      False
                                    </label>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {errors.question_select && (
                        <div className="flex">
                          <span className="text-red-400 text-sm">
                            *{errors.question_select[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {showTimeDuration && (
                    <div className="mb-4">
                      <p className="text-left text-sm font-medium text-slate-700">
                        Survey Time Duration
                      </p>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            className="
                                bordder-[#E9EDF4]
                                w-full
                                rounded-md
                                border
                                bg-[#FCFDFE]
                                py-3
                                px-5
                                outline-nne
                                focus:border-primary
                                focus-visible:shadow-none
                              "
                            label="Set start timer"
                            value={timer_duration}
                            onChange={(e) => setTimerDuration(e.target.value)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            className="
                                  bordder-[#E9EDF4]
                                  w-full
                                  rounded-md
                                  border
                                  bg-[#FCFDFE]
                                  py-3
                                  px-5
                                  outline-nne
                                  focus:border-primary
                                  focus-visible:shadow-none
                                "
                            label="Expire at"
                            value={expire_at}
                            onChange={(e) => setExpireAt(e.target.value)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>

                      {errors.expire_at && (
                        <div className="flex">
                          <span className="text-red-400 text-sm">
                            *{errors.expire_at[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {showTimeDuration && (
                    <div className="mb-4">
                      <p className="text-left text-sm font-medium text-slate-700">
                        Survey Publish Time
                      </p>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            className="
                              bordder-[#E9EDF4]
                              w-full
                              rounded-md
                              border
                              bg-[#FCFDFE]
                              py-3
                              px-5
                              outline-nne
                              focus:border-primary
                              focus-visible:shadow-none
                          "
                            label="Set start timer"
                            value={timer_duration}
                            onChange={(e) => setTimerDuration(e.target.value)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>

                      {errors.timer_duration && (
                        <div className="flex">
                          <span className="text-red-400 text-sm">
                            *{errors.timer_duration[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-left text-sm font-medium text-slate-700">
                      Price with In Timer
                    </p>
                    <input
                      type="number"
                      value={price_within_timer}
                      onChange={(e) => setPriceWithinTimer(e.target.value)}
                      className="
                              bordder-[#E9EDF4]
                              w-full
                              rounded-md
                              border
                              bg-[#FCFDFE]
                              py-3
                              px-5
                              outline-nne
                              focus:border-primary
                              focus-visible:shadow-none
                          "
                    />
                    {errors.price_within_timer && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.price_within_timer[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-left text-sm font-medium text-slate-700">
                      Price with Out Timer
                    </p>
                    <input
                      type="number"
                      value={price_without_timer}
                      onChange={(e) => setPriceWithoutTimer(e.target.value)}
                      className="
                              bordder-[#E9EDF4]
                              w-full
                              rounded-md
                              border
                              bg-[#FCFDFE]
                              py-3
                              px-5
                              text-base text-body-color
                              placeholder-[#76787a]
                              outline-none
                              focus:border-primary
                              focus-visible:shadow-none
                          "
                    />
                    {errors.price_without_timer && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.price_without_timer[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-10">
                    <button
                      type="submit"
                      className="
                            w-full
                            px-4
                            py-3
                            bg-indigo-500
                            hover:bg-indigo-700
                            rounded-md
                            text-white
                        "
                    >
                      Add Survey
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurveyForm;
