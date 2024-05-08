import Home from "./components/Home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RoutesOverview from "./components/RoutesOverview/RoutesOverview";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { getRoadtrips } from "./API/roadtrips";
import { me } from "./API/users";
import Login from "./components/Login";
import Register from "./components/Register";
import RoutesDetailed from "./components/RoutesDetailed";
import InsertRoadtrip from "./components/InsertRoadtrip";
import ViewRoadtrip from "./components/viewRoadtrip";
import { Roadtrip, RoadtripObject, UserFrontend } from "common";
import RoutesTable from "./components/RoutesOverview/RoutesTable";
import Map from "./components/RoutesOverview/MapPlot/Map";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import RoutesTableLine from "./components/RoutesOverview/RoutesTableLine";

function App() {
  const location = useLocation();
  const [reloadRoadtrips, setReloadRoadtrips] = useState(true);
  const [roadtrips, setRoadtrips] = useState<RoadtripObject[] | null>(() => {
    const data = localStorage.getItem("roadtrips");
    if (data !== null && data !== "undefined") {
      const roadtrips: Roadtrip[] = JSON.parse(data);
      roadtrips.map(
        (roadtrip) => (roadtrip.startDateGF = new Date(roadtrip.startDateGF))
      );
      return roadtrips;
    }
    return null;
  });
  const [selectedRoadtrip, setSelectedRoadtrip] =
    useState<RoadtripObject | null>(null);

  const [user, setUser] = useState<UserFrontend | null>(
    useMemo(() => {
      let user = localStorage.getItem("user");
      if (user !== null && user !== "undefined") {
        return JSON.parse(user);
      }
      return null;
    }, [])
  );

  /* a function from the google maps api */
  const render = (status: Status): ReactElement => {
    if (status === Status.FAILURE) return <p>ErrorComponent</p>;
    return <p>Spinner</p>;
  };

  useEffect(() => {
    if (location.state?.reloadRoadtrips)
      setReloadRoadtrips(location.state.reloadRoadtrips);
  }, [location]);

  useEffect(() => {
    getRoadtrips()
      .then(({ data: { roadtrips } }) => {
        setRoadtrips(roadtrips);
        localStorage.setItem("roadtrips", JSON.stringify(roadtrips));
        setReloadRoadtrips(false);
      })
      .catch((err: Error) => console.log(err));
  }, [reloadRoadtrips]);

  useEffect(() => {
    if (!user) {
      me()
        .then(({ data: { user }, status }) => {
          if (status !== 200) {
            localStorage.removeItem("user");
          }
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [user]);

  const [routeTableLines, setRouteTableLines] =
    useState<Array<JSX.Element> | null>(null);

  useEffect(() => {
    //console.log("context change");
    //console.log(data?.roadtrips);
    if (roadtrips) {
      const lines = roadtrips.map((roadtrip: RoadtripObject) => {
        return (
          <RoutesTableLine
            setSelectedRoadtrip={setSelectedRoadtrip}
            key={`line-${roadtrip._id}`}
            roadtrip={roadtrip}
          />
        );
      });
      setRouteTableLines(lines);
    }
  }, [roadtrips]);

  const navigate = useNavigate();
  const ProtectedRoute = ({ children, user, message }) => {
    if (!user) {
      return navigate("/login", {
        state: { message: message },
      });
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/*" element={<Home user={user} setUser={setUser} />} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/register" Component={Register} />
      <Route
        path="/routsOverview"
        element={
          <RoutesOverview>
            <RoutesTable>{routeTableLines}</RoutesTable>
            <Wrapper
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}
              render={render}
            >
              <Map roadtrips={roadtrips} />
            </Wrapper>
          </RoutesOverview>
        }
      />
      <Route
        path="/routsDetailed"
        element={
          <RoutesDetailed>
            <RoutesTable>{routeTableLines}</RoutesTable>
            <Wrapper
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}
              render={render}
            >
              <Map roadtrips={roadtrips} />
            </Wrapper>
          </RoutesDetailed>
        }
      />
      <Route
        path="/insertRoadtrip"
        element={
          <ProtectedRoute
            user={user}
            message={
              "Du solltest dich einloggen bevor du einen Roadtrip reinstellst."
            }
          >
            <InsertRoadtrip />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewRoadtrip"
        element={
          <ViewRoadtrip roadtrip={selectedRoadtrip}>
            <Wrapper
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}
              render={render}
            >
              <Map roadtrips={selectedRoadtrip ? [selectedRoadtrip] : null} />
            </Wrapper>
          </ViewRoadtrip>
        }
      />
    </Routes>
  );
}

export default App;
