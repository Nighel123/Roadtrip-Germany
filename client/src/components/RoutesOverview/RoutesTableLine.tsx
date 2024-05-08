import { Roadtrip, RoadtripObject } from "common";
import { useNavigate } from "react-router-dom";

const RoutesTableLine: React.FC<{
  roadtrip: RoadtripObject;
  setSelectedRoadtrip: React.Dispatch<React.SetStateAction<Roadtrip | null>>;
}> = ({ roadtrip, setSelectedRoadtrip }) => {
  const date = new Date(roadtrip.startDateGF);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  const startDateGF = dd + "." + mm + "." + yyyy;

  const navigate = useNavigate();

  return (
    <tr
      onClick={() => {
        setSelectedRoadtrip(roadtrip);
        navigate("/viewRoadtrip");
      }}
    >
      <td align="center" style={{ width: "100px" }}>
        {roadtrip.iniUser}
      </td>
      <td align="center">
        {roadtrip.startAddress.town}
        <br />
        {roadtrip.startAddress.land}
      </td>
      <td align="center">
        {roadtrip.destAddress.town}
        <br />
        {roadtrip.destAddress.land}
      </td>
      <td style={{ width: "200px" }}>{startDateGF}</td>
    </tr>
  );
};

export default RoutesTableLine;
