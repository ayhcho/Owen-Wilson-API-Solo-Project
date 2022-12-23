import { useEffect, useCallback, useState } from 'react';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import prettyHtml from "json-pretty-html";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../assets/images/owen.png';
// import GoalForm from '../components/GoalForm';
// import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';
import ReactPlayer from "react-player";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentURL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? window.location.origin
      : "http://localhost:3000";
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  const [videoPlaying, changeVideoPlaying] = useState(false);
  const [exampleResponse, changeExampleResponse] = useState("");
  const [exampleJSON, changeExampleJSON] = useState([]);

  const getExample = useCallback(async () => {
    await axios
      .get(
        process.env.REACT_APP_NODE_ENV === "production"
          ? `https://owen-wilson-wow-api.onrender.com/wows/random`
          : "https://owen-wilson-wow-api.onrender.com/wows/random"
      )
      .then((res) => res.data)
      .then((data) => {
        changeExampleResponse(prettyHtml(data));
        changeExampleJSON(data[0]);

        const previewEl = document.getElementsByClassName(
          "react-player__preview"
        );

        if (previewEl[0]) {
          previewEl[0].style.backgroundImage = `url(${data[0].poster}), url(${data[0].poster}) !important;`;
        }
      })
      .catch((e) => console.error(e));
  }, []);

  // useEffect(() => {
  //   console.log(getExample());
  //   getExample();
  // }, [getExample]);


  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login')
    }
    getExample();
    // dispatch(getGoals());

    return() => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch, getExample])

  if(isLoading) {
    return <Spinner />
  }

  return (<>
    <section className="heading">
      <img className="api_logo" src={Logo} alt="API Logo" style={{width: '100px', height: '100px'}}/>
      <h1>Wow!</h1>
      <p style={{fontSize:'20px'}}>The Rizzler Himself</p>
    </section>
    
    {/* <GoalForm /> */}

    <div className="example_wrapper">
            <div className="interactive_wrapper">
              <div
                className="player-wrapper"
                style={{ backgroundImage: "url(" + exampleJSON.poster + ")" }}
              >
                <div className="blur">
                  <ReactPlayer
                    playing={videoPlaying}
                    onClickPreview={() => changeVideoPlaying(true)}
                    onEnded={() => changeVideoPlaying(false)}
                    url={exampleJSON.video["1080p"]}
                    controls={true}
                    light={exampleJSON.poster}
                    style={{ maxWidth: "600px", overflow: "hidden" }}
                  />
                </div>
              </div>
              <div className="refresh-button-wrapper">
                <button className="wow-button" type="button" onClick={getExample}>
                  Generate new WOW
                </button>
              </div>
            </div>
    </div>
    <div className='information'>
        <ul>
          <li>
            Movie: {exampleJSON.movie}
          </li>
          <li>
            Year: {exampleJSON.year}
          </li>
          <li>
            Time Stamp: {exampleJSON.timestamp}
          </li>
          <li>
            Full Line: "{exampleJSON.full_line}"
          </li>
        </ul>
      </div>
  </>
  )
}

export default Dashboard

// {goals.length > 0 ? (
//   <div className="goals">
//     {/* {goals.map((goal) => (
//       <GoalItem key={goal._id} goal={goal} />
//     ))} */}
//   </div>
// ) : (<h3>You have not set any goals</h3>)}


// return (<>
//   <section className="heading">
//     <h1>Welcome</h1>
//     {/* <h1>Welcome {user && user.name}</h1> */}
//     <p>WOW</p>
//   </section>
  
//   {/* <GoalForm /> */}

//   <section className="content">
    
//   </section>
  
// </>