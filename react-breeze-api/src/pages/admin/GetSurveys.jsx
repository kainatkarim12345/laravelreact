import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";

const GetSurveys = () => {
  const { getSurveysData, surveys } = useAuthContext();

  useEffect(() => {
    if (!surveys) {
      getSurveysData();
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
                    md:px-[20px]
                    "
            >
              <h1 className="text-2xl md:text-4xl font-bold">Survey</h1>
              <br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Sr.</TableCell>
                      <TableCell align="right">Survey Type</TableCell>
                      <TableCell align="right">Survey Name</TableCell>
                      <TableCell align="right">Created At</TableCell>
                      <TableCell align="right">Publish At</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  
                    {surveys &&
                      Array.isArray(surveys) &&
                      surveys.map((survey, index) => (
                        <TableBody key={survey.survey_id}>
                        <TableRow
                          key={survey.survey_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="right">{++index}</TableCell>
                          {survey.survey_type === "survey" && (
                            <TableCell align="right">
                              <Button variant="contained" color="success">
                                {survey.survey_type}
                              </Button>
                            </TableCell>
                          )}
                          {survey.survey_type === "profile" && (
                            <TableCell align="right">
                              <Button variant="contained" color="primary">
                                {survey.survey_type}
                              </Button>
                            </TableCell>
                          )}
                          <TableCell align="right" scope="row">
                            {survey.survey_name}
                          </TableCell>
                          <TableCell align="right">
                            {survey.created_at}
                          </TableCell>
                          <TableCell align="right">
                          {survey.published_at ? survey.published_at : "None"}
                          </TableCell>
                          <TableCell align="right">
                            {survey.is_active}
                          </TableCell>
                          <TableCell align="right">
                            <Link to={{pathname:"/surveydetail/"+survey.survey_id}}>
                              <VisibilityIcon />
                            </Link>
                          </TableCell>
                        </TableRow>
                        </TableBody>
                      ))}
                  
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetSurveys;
