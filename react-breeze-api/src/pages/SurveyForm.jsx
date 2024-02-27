import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const SurveyForm = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [timer_duration, setTimerDuration] = useState("");
  const [price_within_timer, setPriceWithinTimer] = useState("");
  const [price_without_timer, setPriceWithoutTimer] = useState("");
  const [expire_at, setExpireAt] = useState("");
  const [value, onChange] = useState("10:00");
  const { addsurvey, errors } = useAuthContext();

  const handleSurvey = async (event) => {
    event.preventDefault();
    alert();
    addsurvey();
  };

  return (
    <section className="bg-[#F4F7FF] py-10 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div
              className="
                    relative
                    mx-auto
                    max-w-[900px]
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
                <h1 className="text-2xl md:text-4xl font-bold">Create Survey</h1>
              </div>
              <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                  <ul>
                    <li>
                      <Link to="/questionform" className="block rounded py-2 pr-4 pl-3 bg-white text-[#4338CA]" aria-current="page">
                        Add Question
                      </Link>
                    </li>
                  </ul>
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
                  <div className="mb-4">
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
                  <div className="mb-4">
                    <p className="text-left text-sm font-medium text-slate-700">
                      Survey type
                    </p>

                    <select
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
                      <option value="">Select Type</option>
                      <option value="profile">Profile</option>
                      <option value="survey">Survey</option>
                    </select>
                    {errors.question && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.question[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Question"
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
                      Survey Time Duration
                    </p>
                    

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker className="
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
                          " label="Set start timer" value={timer_duration}
                          onChange={(e) => setTimerDuration(e.target.value)} />
                      </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker className="
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
                          " label="Expire at" value={expire_at}
                          onChange={(e) => setExpireAt(e.target.value)} />
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
                  <div className="mb-4">
                    <p className="text-left text-sm font-medium text-slate-700">
                      Survey Publish Time
                    </p>
                    

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker className="
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
                          " label="Set start timer" value={timer_duration}
                          onChange={(e) => setTimerDuration(e.target.value)} />
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
