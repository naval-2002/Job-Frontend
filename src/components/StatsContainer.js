import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatsItem from "./StatsItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";

function StatsContainer() {
  const { stats } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: "pending application",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews application",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: " jobs declined  ",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, idx) => {
        return <StatsItem key={idx} {...item} />;
      })}
    </Wrapper>
  );
}

export default StatsContainer;
