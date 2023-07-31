import "./App.css";
import AllRoutes from "./AllRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div
      className="App"
      style={{
        background: "#071952",
        height: "auto",
        minHeight:"250vh",
        textAlign: "center",
        margin: "auto",
      }}
    >
      <AllRoutes />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
