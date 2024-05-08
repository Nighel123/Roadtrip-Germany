import "../css/global.css";
import "../css/viewRoadtrip.css";
import { RoadtripObject } from "common";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import profilePrev from "../IMG/global/profilePrev.jpg";

const ViewRoadtrip: React.FC<{
  roadtrip: RoadtripObject | null;
  children: ReactNode;
}> = ({ roadtrip, children }) => {
  return (
    <div className="viewRoadtrip">
      <header>
        <Link to="/home">
          <div id="homeButton"></div>
        </Link>
      </header>

      <img
        id="profilePrev"
        src={
          roadtrip?._id
            ? `${process.env.REACT_APP_SERVER_URL}/${roadtrip._id}${roadtrip.imgExt}`
            : profilePrev
        }
      />

      <div id="text">
        <h1 id="iniUser">{roadtrip?.iniUser}</h1>
        <p id="descr">{roadtrip?.description}</p>
      </div>

      <div id="mapSpace">{children}</div>

      <input
        id="sendmessg"
        type="submit"
        /* onClick={window.location='sendMessage.htm'} */
        style={{ display: "none" }}
      />
      <label id="sendMessg">Nachricht senden</label>
    </div>
  );
};

export default ViewRoadtrip;
