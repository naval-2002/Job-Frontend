import React from "react";
import Wrapper from "../assets/wrappers/StatItem";

function StatsItem({ count, bcg, title, icon, color }) {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <span className="title">{title}</span>
    </Wrapper>
  );
}

export default StatsItem;
