import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span>app
          </h1>
          <p>
            I'm baby migas polaroid fixie +1 meggings, hoodie banh mi vape deep
            v drinking vinegar. Truffaut chicharrones hot chicken four loko tbh
            yes plz knausgaard sustainable vaporware air plant bruh brunch palo
            santo.
          </p>
          <Link to={"/register"} className="btn btn-hero">
            Register/login
          </Link>
        </div>
        <img src={main} alt="job-hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};
export default Landing;
