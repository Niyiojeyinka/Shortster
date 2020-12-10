import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/home/Index";
import Stats from "./screens/stats/Index";
import Header from "./components/Header";
import "./w3.css";
export default function App() {
  return (
    <Router>
      <div className="bg-body-image">
        <Header />

        <Switch>
          <Route path="/:shortcode/stats">
            <Stats />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
