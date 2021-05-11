import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TeamForm } from "./components/TeamForm";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TeamForm />
    </ThemeProvider>
  );
}

export default App;
