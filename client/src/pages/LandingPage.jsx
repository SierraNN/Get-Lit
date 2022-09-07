import { init } from "../utils/initBookLayer.js"
import { useEffect } from "react"

import {T, useSetLanguage, useCurrentLanguage } from "@tolgee/react"


function LandingPage() {
  useEffect(() => {
    init()
  }, [])

  const setLanguage = useSetLanguage()
  const getLanguage = useCurrentLanguage()

  return (
    <div id = "LandingPage">
      <div className="hero">
        <h1 className="title"><T>page_title</T></h1>
        <p className="text"><T>page_description</T></p>
        <p>
          <button className="btn" onClick={() => setLanguage("en")} style={{background: getLanguage() === "en" ? "#008000" : "#a7a7a7"}}>English</button>
          <button className="btn" onClick={() => setLanguage("es")} style={{background: getLanguage() === "es" ? "#008000" : "#a7a7a7"}}>Spanish</button>
        </p>
      </div>
      {/* content in each class has a T surrounding it to say its from tolgee */}
      <div className="choices">
        <h1><T>choices_title</T></h1>
        <div className="choices-table">
          <div className="choices-card">
            <p className="title"><T>card1_title</T></p>
            <p className="info"><T>card1_text</T></p>
            <button className="btn"><T>click_here</T></button>
          </div>
          <div className="choices-card">
            <p className="title"><T>card2_title</T></p>
            <p className="info"><T>card2_text</T></p>
            <button className="btn"><T>click_here</T></button>
          </div>
          <div className="choices-card">
            <p className="title"><T>card3_title</T></p>
            <p className="info"><T>card3_text</T></p>
            <button className="btn"><T>click_here</T></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;