import { init } from "../utils/initBookLayer.js"
import { useEffect } from "react"
import { T, useSetLanguage, useCurrentLanguage } from "@tolgee/react"
import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext';


function LandingPage() {
  const [auth] = useAuth()
  useEffect(() => {
    init()
  }, [])

  return (
    <div id="LandingPage">
      <div className="hero">
        <Link to={auth ? "/profile" : "/login"}>
          <button className="btn1"><span >{auth ? 'Your Profile' : 'Login to Get Lit'}</span></button>
        </Link>
      </div>
      {/* content in each class has a T surrounding it to say its from tolgee */}
      <div className="choices">
        <div className="choices-table">
          <div className="choices-card">
            <p className="title"><T>card1_title</T></p>
            <p className="info"><T>card1_text</T></p>
            <Link to="/lists">
              <button className="btn"><T>click_here</T></button>
            </Link>
          </div>
          <div className="choices-card">
            <p className="title"><T>card2_title</T></p>
            <p className="info"><T>card2_text</T></p>
            <Link to="/clubs">
              <button className="btn"><T>click_here</T></button>
            </Link>
          </div>
          <div className="choices-card">
            <p className="title"><T>card3_title</T></p>
            <p className="info"><T>card3_text</T></p>
            <Link to="/reviews">
              <button className="btn"><T>click_here</T></button>
            </Link>
          </div>
        </div>
        <img src="/assets/logo/landing.png" className="imageLogo"></img>
      </div>
      <footer><h1 className="footer">MIT License. Find us on <a href='https://github.com/SierraNN/Get-Lit'> GitHub</a>. Made with ♡ </h1></footer>
    </div>

  );
}

export default LandingPage;