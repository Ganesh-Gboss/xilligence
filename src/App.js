import Food from "./components/Food";
import "./components/style.css";
import Container from "@mui/material/Container";

function App() {
  return (
    <div>
      <Container fixed>
        <Food />
      </Container>
    </div>
  );
}

export default App;
