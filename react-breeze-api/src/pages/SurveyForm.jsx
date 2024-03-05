import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import dayjs from "dayjs";


import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const SurveyForm = () => {
  const [name, setName] = useState("");
  const [survey_type, setSurveyType] = useState("");
  const [survey_status, setSurveyStatus] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [timer_duration, setTimerDuration] = useState("");
  const [publish_at, setPublishAt] = useState("");
  const [price_within_timer, setPriceWithinTimer] = useState("");
  const [price_without_timer, setPriceWithoutTimer] = useState("");
  const [expire_at, setExpireAt] = useState("");
  const [showTimeDuration, setShowTimeDuration] = useState(false);
  const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);
  const {
    addsurvey,
    errors,
    user,
    setErrors,
    getQuestions,
    questions,
  } = useAuthContext();
  const [status, setStatus] = useState("Your Survey created");

  const handleCheckboxChange = (questionId) => {
    if (selectedQuestions.find((q) => q.id === questionId)) {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q.id !== questionId)
      );
      setSelectedQuestionsCount(selectedQuestionsCount - 1);
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
      setSelectedQuestionsCount(selectedQuestionsCount + 1);
    }
  };

  const handleSurveyTypeChange = (event) => {
    const selectedSurveyType = event.target.value;
    setSurveyType(selectedSurveyType);

    setSelectedQuestions([]);
    setSelectedQuestionsCount(0);

    setErrors({});

    if (selectedSurveyType === "survey") {
      setShowTimeDuration(true);
    } else {
      setShowTimeDuration(false);
    }

    getQuestions(selectedSurveyType);
  };

  const handleSurvey = async (event) => {
    event.preventDefault();
    let isValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = ["Survey name is required"];
      isValid = false;
    }

    if (!survey_type) {
      newErrors.survey_type = ["Survey type is required"];
      isValid = false;
    }

    if (survey_type === "profile" && selectedQuestionsCount < 2) {
      newErrors.question_select = [
        "Please select at least 2 questions for profile survey",
      ];
      isValid = false;
    }

    if (survey_type === "survey" && selectedQuestionsCount < 2) {
      newErrors.question_select = [
        "Please select at least 2 questions for survey",
      ];
      isValid = false;
    }

    if (!price_within_timer || price_within_timer <= 0) {
      newErrors.price_within_timer = [
        "Price within timer is required and must be greater than 0",
      ];
      isValid = false;
    }
    if (!price_without_timer || price_without_timer <= 0) {
      newErrors.price_without_timer = [
        "Price without timer is required and must be greater than 0",
      ];
      isValid = false;
    }

    if (survey_type === "survey") {
      if (!timer_duration) {
        newErrors.timer_duration = ["Timer duration is required"];
        isValid = false;
      }
      if (!expire_at) {
        newErrors.expire_at = ["Expire date is required"];
        isValid = false;
      }
      if (!publish_at) {
        newErrors.publish_at = ["Publish date is required"];
        isValid = false;
      }
    }

    if (!survey_status) {
      newErrors.survey_status = ["Survey Status is required"];
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    let timer_duration_time = "";
    let publish_at_time = "";
    let expire_at_time = "";
    if (survey_type === "survey") {
      timer_duration_time = dayjs(timer_duration).format("YYYY-MM-DD HH:mm:ss");

      publish_at_time = dayjs(publish_at).format("YYYY-MM-DD HH:mm:ss");

      expire_at_time = dayjs(expire_at).format("YYYY-MM-DD HH:mm:ss");
    }

    const formData = {
      name,
      survey_type,
      survey_status,
      selectedQuestions,
      ...(survey_type === "survey" && {
        timer_duration: timer_duration_time,
        expire_at: expire_at_time,
        publish_at: publish_at_time,
      }),
      price_within_timer,
      price_without_timer,
    };

    if (formData) {
      console.log(formData);
      addsurvey(formData);

      swal({
        position: "top-end",
        icon: "success",
        title: status,
        showConfirmButton: false,
        timer: 1500
      });

      setName("");
      setSurveyType("");
      setSurveyStatus("");
      setSelectedQuestions([]);
      setTimerDuration("");
      setPublishAt("");
      setPriceWithinTimer("");
      setPriceWithoutTimer("");
      setExpireAt("");
      setShowTimeDuration(false);
      setSelectedQuestionsCount(0);
    }
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
            <div className=" text-center md:mb-10">
              <h1 className="text-2xl md:text-4xl font-bold">Create Survey</h1>
            </div>
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
                      <div className="mb-8 text-center md:mb-16">
                        <h3 className="text-1xl md:text-3xl font-bold">
                          Select Questions for {survey_type}
                        </h3>
                      </div>
                      {errors.question_select && (
                        <div className="flex">
                          <span className="text-red-400 text-sm">
                            *{errors.question_select[0]}
                          </span>
                        </div>
                      )}
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
                            <tr key={index} className="text-left">
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
                            onChange={(value) => setTimerDuration(value)}
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
                            onChange={(value) => setExpireAt(value)}
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
                            value={publish_at}
                            onChange={(value) => setPublishAt(value)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>

                      {errors.publish_at && (
                        <div className="flex">
                          <span className="text-red-400 text-sm">
                            *{errors.publish_at[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {survey_type === "profile" && (
                    <div className="mb-4">
                      <p className="text-left text-sm font-medium text-slate-700">
                        Price after profile completion
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
                  )}

                  {survey_type === "survey" && (
                    <div className="mb-4">
                      <p className="text-left text-sm font-medium text-slate-700">
                        Price within timer
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
                  )}

                  {survey_type === "profile" && (
                    <div className="mb-4">
                      <p className="text-left text-sm font-medium text-slate-700">
                        Price before profile completion
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
                  )}

                  {survey_type === "survey" && (
                    <div className="mb-4">
                      <p className="text-left text-sm font-medium text-slate-700">
                        Price without timer
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
                  )}

                  <div className="mb-4">
                    <div className="flex items-center space-x-4">
                      <label className="block text-body-color mt-4 mb-2">
                        Survey status
                      </label>
                      <div className="items-center space-x-2">
                        <input
                          type="radio"
                          value="active"
                          checked={survey_status === "active"}
                          onChange={() => setSurveyStatus("active")}
                          className="form-radio h-4 w-4 text-primary border-primary focus:ring-primary"
                        />
                        <label className="text-sm text-body-color">
                          Active
                        </label>
                      </div>
                      <div className="items-center space-x-2">
                        <input
                          type="radio"
                          value="deactive"
                          checked={survey_status === "deactive"}
                          onChange={() => setSurveyStatus("deactive")}
                          className="form-radio h-4 w-4 text-primary border-primary focus:ring-primary"
                        />
                        <label className="text-sm text-body-color">
                          Deactive
                        </label>
                      </div>
                    </div>
                    {errors.survey_status && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.survey_status[0]}
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
