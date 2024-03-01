import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";

export default function SurveyDetail(props) {
  const { getSurveyDetail, surveydetail } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    getSurveyDetail(id);
  }, [getSurveyDetail, id]);

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
                    md:px-[20px]
                    "
            >
              {surveydetail && (
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold">{surveydetail.survey_type}</h1>
                  <br />
                  <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                    <div className="container mx-auto flex flex-wrap items-center justify-between">
                      
                      <Button variant="contained" color="success">
                        {surveydetail.is_active}
                      </Button>
                      <div className="hidden w-full md:block md:w-auto">
                        <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                          <li>
                            Publish At&nbsp;
                            <Button variant="contained" color="warning">
                              {surveydetail.published_at}
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              )}
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
                      md:px-[20px]
                      "
              >
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
