import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [question_type, setQuestionType] = useState("");
  const [text_field, setTextField] = useState("");
  const [true_false, setTrueFalse] = useState("");
  const [options, setOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [questionFor, setQuestionFor] = useState("profile");
  const { questionform, errors, status, setErrors } = useAuthContext();

  const setValidation = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: [message],
    }));
  };

  const handleQuestion = async (event) => {
    event.preventDefault();
    let formData = {};

    if (!question.trim()) {
      setValidation("question", "Question is required");
      return;
    }

    if (!question_type) {
      setValidation("question_type", "Question type is required");
      return;
    }

    if (!questionFor) {
        setValidation("questionFor", "Question for is required"); 
        return;
      }

    formData.question = question;
    formData.question_type = question_type;
    formData.question_for = questionFor;

    switch (question_type) {
      case "MCQs":
        if (
          options.length < 2 ||
          options.some((option) => !option.text.trim())
        ) {
          setValidation("options", "At least two options are required");
          options.forEach((option) => {
            if (!option.text.trim()) {
              addOptionError(option.id, "Option text is required");
            }
          });
          return;
        }
        formData.options = options.map((option) => option.text);
        break;
      case "Text Field":
        if (!text_field.trim()) {
          setValidation("text_field", "Text field is required");
          return;
        }
        formData.text_field = text_field;
        break;
      case "True/False":
        if (!true_false) {
          setValidation("true_false", "Please select True or False");
          return;
        }
        formData.true_false = true_false;
        break;
      default:
        break;
    }

    questionform(formData);

    setQuestion("");
    setQuestionType("");
    setOptions([]);
    setTextField("");
    setTrueFalse("");
  };

  const handleQuestionTypeChange = (e) => {
    const newQuestionType = e.target.value;
    setQuestionType(newQuestionType);
    switch (newQuestionType) {
      case "MCQs":
        setTextField("");
        setOptions([
          { id: 1, text: "" },
          { id: 2, text: "" },
        ]);
        break;
      case "Text Field":
        setOptions([]);
        break;
      case "True/False":
        setTextField("");
        setOptions([]);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      question: [],
      question_type: [],
    }));
  };

  const handleOptionChange = (id, text) => {
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        return { ...option, text };
      }
      return option;
    });
    setOptions(updatedOptions);

    setErrors((prevErrors) => ({
      ...prevErrors,
      options: {
        ...prevErrors.options,
        [id]: null,
      },
    }));
  };

  const addOptionError = (id, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      options: {
        ...prevErrors.options,
        [id]: message,
      },
    }));
  };

  const addOption = () => {
    const newId = options.length + 1;
    setOptions([...options, { id: newId, text: "" }]);
  };

  const removeOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div className="relative mx-auto max-w-[500px] overflow-hidden rounded-lg bg-white py-9 text-center sm:px-12 md:px-[60px]">
              {status && (
                <div className="bg-green-700 m-2 p-2 rounded text-white">
                  {status}
                </div>
              )}
              <div className="mb-10 text-center md:mb-16">Add Questions</div>
              <form onSubmit={handleQuestion}>
                <div className="mb-4">
                  <div className="flex items-center space-x-4">
                    <label className="block text-body-color mt-4 mb-2">
                      Question add for:
                    </label>
                    <div className="items-center space-x-2">
                      <input
                        type="radio"
                        name="question_for"
                        value="profile"
                        checked={questionFor === "profile"}
                        onChange={() => setQuestionFor("profile")}
                        className="form-radio h-4 w-4 text-primary border-primary focus:ring-primary"
                      />
                      <label className="text-sm text-body-color">Profile</label>
                    </div>
                    <div className="items-center space-x-2">
                      <input
                        type="radio"
                        name="question_for"
                        value="survey"
                        checked={questionFor === "survey"}
                        onChange={() => setQuestionFor("survey")}
                        className="form-radio h-4 w-4 text-primary border-primary focus:ring-primary"
                      />
                      <label className="text-sm text-body-color">Survey</label>
                    </div>
                  </div>
                    {errors.questionFor && (
                        <div className="flex">
                        <span className="text-red-400 text-sm">
                            *{errors.questionFor[0]}
                        </span>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Question write here"
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  {errors.question && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.question[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <p className="text-left text-sm font-medium text-slate-700">
                    Question type
                  </p>
                  <select
                    onChange={handleQuestionTypeChange}
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#76787a] outline-none focus:border-primary focus-visible:shadow-none"
                  >
                    <option value={""}>Select Type</option>
                    <option value={"MCQs"}>MCQs</option>
                    <option value={"Text Field"}>Text Field</option>
                    <option value={"True/False"}>True/False</option>
                  </select>
                  {errors.question_type && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.question_type[0]}
                      </span>
                    </div>
                  )}
                </div>
                {question_type === "True/False" && (
                  <div className="mb-4">
                    <p className="text-left text-sm font-medium text-slate-700">
                      True/False
                    </p>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="True"
                          onChange={(e) => setTrueFalse(e.target.value)}
                          className="form-radio"
                        />
                        <span className="ml-2">True</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          value="False"
                          onChange={(e) => setTrueFalse(e.target.value)}
                          className="form-radio"
                        />
                        <span className="ml-2">False</span>
                      </label>
                    </div>
                    {errors.true_false && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.true_false[0]}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {question_type === "Text Field" && (
                  <div className="mb-4">
                    <textarea
                      value={text_field}
                      onChange={(e) => setTextField(e.target.value)}
                      placeholder="Enter your text here"
                      className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                    />
                    {errors.text_field && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.text_field}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {question_type === "MCQs" && (
                  <div className="mb-4">
                    <p className="text-left text-sm font-medium text-slate-700">
                      Options
                    </p>
                    {options.map((option, index) => (
                      <div key={option.id} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            handleOptionChange(option.id, e.target.value)
                          }
                          placeholder={`Option ${index + 1}`}
                          className="border-[#E9EDF4] flex-1 rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(option.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                        {errors.options && errors.options[option.id] && (
                          <span className="text-red-400 text-sm ml-2">
                            {errors.options[option.id]}
                          </span>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addOption}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
                <div className="mb-10">
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
                  >
                    Add Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionForm;
