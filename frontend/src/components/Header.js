import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="w3-padding w3-blue">
      <Link className="text-decoration-none" to="/">
        <b className="w3-large">Shortster</b>
      </Link>
    </div>
  );
}
export default Header;
