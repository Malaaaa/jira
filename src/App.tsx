import "./App.css";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { BrowserRouter } from "react-router-dom";

// import ProjectListScreen from "screens/project-list";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}
export default App;
