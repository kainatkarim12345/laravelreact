import { useState } from "react";
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

import { useEffect } from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  const { getTermsData, terms } = useAuthContext();

  useEffect(() => {
    if (!terms) {
      getTermsData();
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
              <h1 className="text-2xl md:text-4xl font-bold">
                Terms and Conditions
              </h1>
              <br />
              <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                  <Link
                    to="/termsform"
                    className="block rounded py-2 pr-4 pl-3 bg-white text-[#4338CA]"
                    aria-current="page"
                  >
                    Add Term
                  </Link>
                </div>
              </nav>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Sr.</TableCell>
                      <TableCell align="right">Terms</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {terms &&
                    Array.isArray(terms) &&
                    terms.map((terms, index) => (
                      <TableBody key={terms.id}>
                        <TableRow
                          key={terms.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{++index}</TableCell>
                          <TableCell align="left" scope="row">
                            {terms.terms_text}
                          </TableCell>
                          <TableCell align="left">{terms.is_active}</TableCell>
                          <TableCell align="left">
                            <Link to={{ pathname: "/termsdetail/" + terms.id }}>
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

export default Terms;
