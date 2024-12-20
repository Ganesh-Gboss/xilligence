import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import FoodDetails from "./FoodDetails";
import { API_URL } from "../constants";
const FoodItem = (props) => {
  const { itemDetails } = props;
  const [openDetails, setOpenDetails] = React.useState(false);
  const [selectedFood, setSelectedFood] = useState([]);
  const changeopenDetails = () => setOpenDetails(!openDetails);
  const handleClickOpen = () => {
    changeopenDetails();
    console.log(itemDetails);
    try {
      fetch(`${API_URL[0].ITEM_DETAILS}${itemDetails.idMeal}`).then((data) =>
        data.json().then((res) => setSelectedFood(res.meals[0]))
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => handleClickOpen()}>
          <CardMedia
            component="img"
            height="140"
            image={itemDetails.strMealThumb}
            alt="Food Image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="charLength"
            >
              {itemDetails.strMeal}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              className="charLength"
            >
              Category: {itemDetails.strCategory} | Area: {itemDetails.strArea}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {openDetails && (
        <FoodDetails
          selectedFood={selectedFood}
          changeopenDetails={() => changeopenDetails()}
        />
      )}
    </>
  );
};
export default FoodItem;
