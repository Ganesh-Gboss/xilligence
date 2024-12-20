import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { API_URL, TITLES } from "../constants";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FoodDetails = (props) => {
  const { selectedFood, changeopenDetails } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    changeopenDetails();
  };
  const getYTUrl = () => {
    console.log(selectedFood.strYoutube);
    var url = new URL(selectedFood.strYoutube);
    var code = url.searchParams.get("v");
    return `${API_URL[0].YT_VIDEO}${code}`;
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {TITLES[0].DETAILS_HEAD}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, mx: 8, my: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} className="center-content">
              <img
                className="details-thumb"
                src={selectedFood.strMealThumb}
                alt="food finder logo"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <h1>{selectedFood.strMeal && selectedFood.strMeal}</h1>
              <h4>{TITLES[0].DETAILS_CATEGORY}</h4>
              <span>{selectedFood.strCategory}</span>
              <h4>{TITLES[0].DETAILS_INSTRUCTIONS}</h4>
              <span>{selectedFood.strInstructions}</span>
              <h4>{TITLES[0].DETAILS_INGREDIENTS}</h4>
              <span>{selectedFood.strInstructions}</span>
            </Grid>
          </Grid>
          {selectedFood.strYoutube && selectedFood.strYoutube !== "" && (
            <Grid
              container
              spacing={2}
              sx={{ my: 8 }}
              className="center-content"
            >
              <Grid size={{ xs: 12, md: 12 }}>
                <h1>YouTube video</h1>
                <iframe
                  src={getYTUrl()}
                  className="details-thumb"
                  frameborder="0"
                  allowTransparency="true"
                  allow="encrypted-media"
                ></iframe>
              </Grid>
            </Grid>
          )}
        </Box>
      </Dialog>
    </>
  );
};
export default FoodDetails;
