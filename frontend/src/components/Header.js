import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header() {
  return (
    <div className="w3-padding w3-blue">
      <Link className="text-decoration-none" to="/">
        Home
      </Link>
    </div>
  );
}
export default Header;
