import { init } from "../utils/initBookLayer.js"
import { useEffect } from "react"
import { T, useSetLanguage, useCurrentLanguage } from "@tolgee/react"
import { Link } from "react-router-dom"


function LandingPage() {
  useEffect(() => {
    init()
  }, [])
  return (
    <div id = "LandingPage">
      <div className="hero">
        <Link to="/login">
          <button className="btn1"><a href="#">Login to Get Lit</a></button>
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
      </div>
      <img src="../assets/logo/landing.png" className="imageLogo"></img>
    </div>
    
  );
}

export default LandingPage;