import React, { useState, useEffect, lazy, Suspense } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FoodSearchTab from "./FoodSearchTab";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { TITLES, API_URL, ERRORS } from "../constants";
const FoodItem = lazy(() => import("./FoodItem"));

const Food = () => {
  const [searchValue, setsearchValue] = useState(null);
  const [foodList, setFoodList] = useState(null);
  const [loader, setLoader] = useState(false);
  const [searchUrl, setSearchUrl] = useState(API_URL[0].SEARCH_S);
  const handleSearch = (e) => {
    if (e.code === "Enter") {
      if (e.target.value.trim() === "") {
        setFoodList(null);
      }
      setsearchValue(e.target.value.trim());
    }
  };
  const handleSearchBy = (type) => {
    if (type === "s") {
      setSearchUrl(API_URL[0].SEARCH_S);
    } else if (type === "i") {
      setSearchUrl(API_URL[0].SEARCH_I);
    }
  };
  useEffect(() => {
    if (searchValue !== null && searchValue !== "") {
      setLoader(true);
      try {
        fetch(`${searchUrl}${searchValue}`).then((data) =>
          data.json().then((res) => {
            setFoodList(res.meals);
            console.log(res.meals);
            setLoader(false);
          })
        );
      } catch (e) {
        setLoader(false);
      }
    }
  }, [searchValue]);

  return (
    <>
      <div>
        <div className="logo-block">
          <img className="logo" src="/foodfinder.png" alt="food finder logo" />
        </div>
        <div className="heading">
          <center>
            <strong className="search-title">{TITLES[0].SUB_TITLE}</strong>

            <div>
              <FoodSearchTab handleSearchBy={(type) => handleSearchBy(type)} />
            </div>
            <div className="search-container">
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-search">
                  &nbsp;Search
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-search"
                  onKeyDown={(e) => {
                    handleSearch(e);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  label="Search"
                />
              </FormControl>
            </div>
            <div>
              {foodList && foodList.length > 0 && (
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {Array.from(Array(foodList.length)).map((_, index) => (
                      <Grid item xs={2} sm={4} md={4} key={index}>
                        <Suspense>
                          <FoodItem itemDetails={foodList[index]} />
                        </Suspense>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              {foodList === null &&
                searchValue !== "" &&
                searchValue !== null &&
                !loader &&
                ERRORS[0].NOT_FOUND}
              {searchValue === "" &&
                searchValue !== null &&
                ERRORS[0].EMPTY_SEARCH}
            </div>
          </center>
        </div>
        <Backdrop open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};
export default Food;
