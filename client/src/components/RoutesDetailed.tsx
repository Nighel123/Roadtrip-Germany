import "../css/global.css";
import "../css/routsDetailed.css";
import RoutesTable from "./RoutesOverview/RoutesTable";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { ReactElement, ReactNode, useEffect } from "react";
import Map from "./RoutesOverview/MapPlot/Map";
import { Link } from "react-router-dom";

/* a function from the google maps api */
const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <p>ErrorComponent</p>;
  return <p>Spinner</p>;
};

const RoutesDetailed: React.FC<{
  children: [ReactNode, ReactNode];
}> = ({ children }) => {
  useEffect(() => {
    window.scroll(0, 150);
  });

  return (
    <div className="routesDetailed">
      <header>
        <Link to="/home.htm">
          <div id="/homeButton"></div>
        </Link>
      </header>

      {/* Big Map with Routs and a list of Roadtrips */}
      <div id="outerFrame">
        <div id="innerFrame">
          {/* List with Roadtrips */}
          <div id="ListFrame">
            <div id="RoadtripsList">{children[0]}</div>
          </div>

          {/* Map with Routs on it */}
          <div id="MapFrame">
            <div id="mapSpace">{children[1]}</div>
          </div>
        </div>
      </div>

      {/* profile preview-picture */}
      <div id="profilePrev"></div>

      {/* insert Roadtrip Form */}
      {/* Später noch ersetzen mit der Komponente vom Roadtrip einstellen */}
      <form name="insertRoadtripForm">
        <p>
          <textarea name="text"></textarea>
        </p>
        <table style={{ float: "left", paddingBottom: "40px" }}>
          <tr>
            <td>
              <p>Name:</p>
            </td>
            <td>
              <input name="name" size={24} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Email:</p>
            </td>
            <td>
              <input name="email" size={24} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Handy:</p>
            </td>
            <td>
              <input name="handy" size={24} />
            </td>
          </tr>
        </table>
        <Link to="javascript:document.roadtrip_eintragen.submit();">
          <div id="roadtrip_eintragen_button"></div>
        </Link>
      </form>
    </div>
  );
};

export default RoutesDetailed;
