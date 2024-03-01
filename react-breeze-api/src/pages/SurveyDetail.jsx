import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
              <h1 className="text-2xl md:text-4xl font-bold">Survey</h1>
            <h2>Survey data</h2>
          
                    {surveydetail && (
                        <div className="card p-4">
                            <h2>Name</h2>
                            <p>{surveydetail.survey_name}</p>
                            <h2>Email</h2>
                            <p>{surveydetail.survey_type}</p>
                        </div>
                    )}
                            </div>
          </div>
        </div>
      </div>
    </section>
    );
}
