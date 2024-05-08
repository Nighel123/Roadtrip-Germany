import { useEffect, useRef } from "react";
import { mapPlot } from "./MapPlot";
import { RoadtripObject } from "common";
import { useWindowDimensions } from "../../../helpers/WindowDimensions";

const Map: React.FC<{ roadtrips: RoadtripObject[] | null }> = ({
  roadtrips,
}) => {
  const { width } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);
  //const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const zoom = width > 1000 ? 4 : 1;
  const strokeWeight = width > 1000 ? 10 : 4;
  const fontSize = width > 1000 ? "20px" : "4px";

  useEffect(() => {
    if (roadtrips) {
      mapPlot(ref, zoom, strokeWeight, fontSize, true, true, roadtrips);
    }
  }, [roadtrips, zoom, strokeWeight, fontSize]);

  return <div ref={ref} id="map" />;
};

export default Map;
