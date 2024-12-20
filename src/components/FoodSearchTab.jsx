import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { TITLES } from "../constants";

const FoodSearchTab = (props) => {
  const { handleSearchBy } = props;
  const [alignment, setAlignment] = React.useState("s");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    handleSearchBy(newAlignment);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ mt: 3, mx: "auto" }}
    >
      <ToggleButton value="s">{TITLES[0].SEARCH_BY_NAME}</ToggleButton>
      <ToggleButton value="i">{TITLES[0].SEARCH_BY_INGREDIENTS}</ToggleButton>
    </ToggleButtonGroup>
  );
};
export default FoodSearchTab;
