import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function SurveyDetail(props) {
  const { getSurveyDetail, surveydetail } = useAuthContext();
  const { id } = useParams();
  const [responses, setResponses] = useState({});
  const [timePeriodInHours, setTimePeriodInHours] = useState(null);

  useEffect(() => {
    getSurveyDetail(id);
  }, [getSurveyDetail, id]);

  useEffect(() => {
    if (surveydetail && surveydetail[0]) {
      const startTime = new Date(surveydetail[0].start_time);
      const expireTime = new Date(surveydetail[0].expire_at);
      const timeDifference = expireTime - startTime;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      setTimePeriodInHours(hoursDifference);
    }
  }, [surveydetail]);

  const getUniqueQuestionsWithOptions = () => {
    const uniqueQuestions = {};
    if (surveydetail) {
      surveydetail.forEach((questionData) => {
        if (!uniqueQuestions[questionData.question]) {
          uniqueQuestions[questionData.question] = {
            question: questionData.question,
            questionType: questionData.question_type,
            options: [questionData.option_text],
          };
        } else {
          uniqueQuestions[questionData.question].options.push(
            questionData.option_text
          );
        }
      });
    }
    return Object.values(uniqueQuestions);
  };

  const handleInputChange = (question, value) => {
    setResponses((prevState) => ({
      ...prevState,
      [question]: value,
    }));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderInput = (question, questionType) => {
    switch (questionType) {
      case "True/False":
        return (
          <RadioGroup
            value={responses[question] || ""}
            onChange={(e) => handleInputChange(question, e.target.value)}
          >
            <FormControlLabel value="True" control={<Radio />} label="True" />
            <FormControlLabel value="False" control={<Radio />} label="False" />
          </RadioGroup>
        );
      case "MCQs":
        return (
          <RadioGroup
            value={responses[question] || ""}
            onChange={(e) => handleInputChange(question, e.target.value)}
          >
            {getUniqueQuestionsWithOptions()
              .find((item) => item.question === question)
              ?.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
          </RadioGroup>
        );
      case "Text Field":
        return (
          <TextField
            fullWidth
            multiline
            value={responses[question] || ""}
            onChange={(e) => handleInputChange(question, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-[#F4F7FF] py-10 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full">
            <div className="mx-auto max-w-[1200px] bg-white rounded-lg px-6 py-9 text-left">
              {surveydetail && (
                <div>
                  <p className="text-2xl md:text-4xl font-bold">
                    {surveydetail[0].survey_type}&nbsp;&nbsp;
                    <Button variant="contained" color="success">
                      {surveydetail[0].is_active}
                    </Button>
                  </p>

                  <br />
                  <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                    <div className="container mx-auto flex flex-wrap items-center justify-between">
                      <h2 className="text-lg font-semibold">
                        Total Questions:{" "}
                        {getUniqueQuestionsWithOptions().length}
                      </h2>
                      <div className="hidden w-full md:block md:w-auto">
                        <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                          <li>
                            <b>Publish At </b>&nbsp;
                            <Button variant="contained" color="warning">
                              {formatTime(surveydetail[0].published_at)}
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  {surveydetail &&
                    surveydetail[0] &&
                    surveydetail[0].survey_type !== "profile" && (
                      <div className="mt-6 flex flex-row justify-between">
                        <div className="text-left">
                          <p className="mb-2">
                            Created At: {formatTime(surveydetail[0].created_at)}
                          </p>
                          <p className="mb-2">
                            Start At: {formatTime(surveydetail[0].start_time)}
                          </p>
                          <p className="mb-2">
                            Expire At: {formatTime(surveydetail[0].expire_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="mb-2">
                            Price Within Timer:{" "}
                            {surveydetail[0].price_within_timer}
                          </p>
                          <p className="mb-2">
                            Price Without Timer:{" "}
                            {surveydetail[0].price_without_timer}
                          </p>
                          {timePeriodInHours !== null && (
                            <p className="mb-2" style={{ color: "red" }}>
                              Time Period: {timePeriodInHours} hours
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  <div className="mt-6">
                    {getUniqueQuestionsWithOptions().map(
                      (questionData, index) => (
                        <div key={index} className="mb-6">
                          <h2 className="text-lg font-semibold mb-2">
                            Q:{++index} {questionData.question}
                          </h2>
                          {renderInput(
                            questionData.question,
                            questionData.questionType
                          )}
                          <div></div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
