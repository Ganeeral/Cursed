"use client";

import React from "react";
import { useState, useEffect } from "react";

const Container = () => {
  const [isColumn, setIsColumn] = useState(false);
  return <div className="" style={{marginLeft: isColumn ? "84px" : "248px"}} ></div>;
};

export default Container;
