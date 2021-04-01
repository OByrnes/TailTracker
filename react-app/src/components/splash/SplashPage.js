import { NavLink, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux"
import * as sessionActions from '../../store/session'
import SplashNav from "./SplashNav"
import SplashSidebar from "./SplashSidebar"
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import allinoneplace from "../../images/ImagesForTT/allDogs.png"
import zoomiesPic from "../../images/ImagesForTT/zoomies.png"
import happyPic from "../../images/ImagesForTT/happy.png"
import trackPic from "../../images/ImagesForTT/track.png"
import tipsPic from "../../images/ImagesForTT/trick.png"
import boxer from "../../images/ImagesForTT/boxer.png"
import spiralpuppy from "../../images/ImagesForTT/spiralpuppy.png"
import borderpuppies from "../../images/ImagesForTT/borderpuppies.png"


const Splash = () => {
    const dispatch = useDispatch();
    const signs = [{title:"Destruction",text:"Do you come home to chewed shoes or overturned trash cans? Your dog might need more exercise. Destructive behavior is one of the primary signs of a bored or anxious dog. And exercise is one of the best solutions!", imgurl:"https://www.zooplus.co.uk/magazine/wp-content/uploads/2018/01/fotolia_134798768-768x542.jpg"},
    {title:"Rough Play", text:"Sure, some dogs are more rough-and-tumble than others. But if your dog is constantly engaging in rough play and seems to lack self-control, they may have an excess of pent-up energy. You can help by providing structured exercise opportunities.",imgurl:"https://www.cesarsway.com/wp-content/uploads/2015/06/AdobeStock_103256344-1024x683.jpeg"},{title: "Weight Gain", text:"Dogs gain weight when they take in more energy than they can use; in other words, when they eat too much, and don’t exercise enough. Obesity is especially common in older dogs, who naturally slow down as they age. If your dog is packing on pounds, it may be time to boost their exercise routine. Note: certain diseases and disorders can lead to rapid weight gain. Always consult your veterinarian if your dog’s weight suddenly changes, and before embarking on a weight loss plan",imgurl:"http://cdn.akc.org/content/hero/obesity_pug_hero.jpg"},{title:"Restlessness",text:"Does your dog have trouble sleeping through the night? Do they pace around the room while you’re trying to get work done? Restlessness is a sign of energy to burn, so tire them out with exercise.",imgurl:"https://dogsaholic.com/wp-content/uploads/2015/03/Restless-dog.jpg"},{title:"Excess Barking", text:"Like restlessness and destructive behavior, barking can be a sign of anxiety or boredom. If your dog has a lot of pent-up energy, they may express it vocally.",imgurl:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2009/01/12215158/barking-dog.jpg"},{title:"Sluggishness or Depression",text:"Exercise isn’t just about physical fitness. Like humans, dogs need movement to maintain mental and emotional health. If your dog doesn’t get enough exercise, they may become depressed. Note: loss of interest can be a sign of illness or more serious conditions. Talk to your vet if you’re concerned about a sudden change in behavior.", imgurl:"https://s28489.pcdn.co/wp-content/uploads/2019/02/p1cjmfv49u11co1tsn1fr61869sjj6.jpg"},{title:"Pestering or Annoying Behavior",text:"Dogs can get bored if they’re not given enough mental & physical exercise. Since they’re looking for something to do they’ll leap up and follow you around wherever you go. You’re their main source of their entertainment, so if your dog gets excited when he’s following you around it may be a sign that he’s bored and looking for something to do.",imgurl:"https://barkpost.com/wp-content/uploads/2015/11/clingy5-e1448843573979.jpg"}]
    const user = useSelector(state => state.session.user);
    const sources =["https://www.akc.org/expert-advice/nutrition/8-ways-to-help-your-overweight-dog/",'https://www.cesarsway.com/','https://dogsaholic.com/training/how-to-calm-down-a-dog.html','https://www.akc.org/expert-advice/training/help-my-dog-wont-stop-barking-while-home-alone/',"https://www.whole-dog-journal.com/behavior/is-my-dog-depressed/",'https://www.puppyleaks.com/dog-velcro-dog/']
    const features = [{title: "Add all your dogs", text: "Track all your puppers in one place.", pic: allinoneplace}, {title: "Keep your dog healthy and happy", text:"They're your best friend. Keep them going!", pic: happyPic}, {title: "Track their progess", text: "Keeps track of all their activities for the week", pic: trackPic},{title:"Get tips", text:"Get tips and tricks", pic:tipsPic},{title:"Get rid of the zoomies", text:"Daily exercise helps with behavior issues.", pic:zoomiesPic}]
    const [authenticated, setAuthenticated] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    const [sign, setSign] = useState(signs[2])
    
    Modal.setAppElement("#root");
    const closeSignup = () => {
        setSignup(false);
    };
    const closeLogin = () => {
        if (signup) setSignup(false);
        setLogin(false);
    };
    const openSignup = () => {
        if (login) setLogin(false);
        setSignup(true);
    };
    const openLogin = () => {
        if (signup) setSignup(false);
        setLogin(true);
    };
    
    const demoLogin = () => {
        const user =  dispatch(sessionActions.login('demo@aa.io', "password"));
        setAuthenticated(true);
    };
    if (user) {  

      return (
        <Redirect
          to="/home"
          // authenticated={authenticated}
          // setAuthenticated={setAuthenticated}
        />
      );
    } 
    
    return (
        <div className="splash__container">
            <SplashNav setShowSidebar={setShowSidebar} />
            {(showSidebar)?<SplashSidebar setShowSidebar={setShowSidebar, setLogin, setSignup}/>:null}
            <Modal
        isOpen={signup}
        contentLabel="Signup"
        className="modalInner"
        overlayClassName="ModalOverlay"
        onRequestClose={closeSignup}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" onClick={(e) => setSignup(false)}>
            X
          </button>
        </div>
        <SignUpForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
        />
      </Modal>
      <Modal
        isOpen={login}
        contentLabel="Login"
        className="modalInner"
        overlayClassName="ModalOverlay"
        onRequestClose={closeLogin}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" onClick={(e) => setLogin(false)}>
            X
          </button>
        </div>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
          openLogin={openLogin}
        />
      </Modal>
            <div className="splash-body__container">
                <div className="splash-section0">
                    <img className="boxerleft" src={boxer} alt="boxer"/>
                    <div className="SignUpSplash__container">
                        <img src={borderpuppies} alt="borderpuppies"/>
                        <span className="header">Tail Tracker</span>
                        <span>Track your Doggo's Exercise and Activities</span>
                        <div className="signupbtn clickable" onClick={openSignup}><span>Sign Up</span></div>
                        <div  className="login-demo__container clickable">
                            <span className="clickable" onClick={openLogin}>Already have an account? Log in</span>
                            <span className="clickable" onClick={demoLogin}>Demo User</span>
                        </div>

                    </div>
                    <img className="boxerright" src={boxer} alt="boxer"/>
                </div>
                <div className="splash-section1">
                    {features.map(feature => (
                        <div key={feature.title} className="feature__container">
                            <span>{feature.title}</span>
                            <img src={feature.pic} alt="feature" />
                            <span>{feature.text}</span>
                        </div>
                    ))}
                    

                </div>
                
                <div className="splash-section2">
                    <div className="signsHeader__container">
                        <h3>Signs That Your dog needs more Exercise</h3>
                    </div>
                    <div >
                        <img className="spiralpuppy" src={spiralpuppy} alt="spiral"/>
                        <div className="signs__container">
                        <h1>{sign.title}</h1>
                        <div className="signs-img-text__container">
                            <img src={sign.imgurl} alt="signImg"/>
                            <p>{sign.text}</p>
                        </div>
                        </div>
                    </div>
                    <div className="signClicker__Container">
                        {signs.map((sign,i) => (<span key={sign.title} className="signClicker" onClick={()=>setSign(signs[i])}>{sign.title}</span>))}

                    </div>
                </div>

            </div>
            <footer>
                <a href="https://github.com/OByrnes/TailTracker/">Github</a>
                <a href="https://www.linkedin.com/in/olivia-byrnes-85861b1b3/">LinkedIn</a>
            </footer>
         </div>
          
    );
  };
  export default Splash;
  