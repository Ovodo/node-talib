import React from "react";
import axios from "axios";

const stuff = async () => {
  const res = await axios.get("http://localhost:3000/api/cron");
  return res.data;
};

const Pages = async () => {
  const dat = await stuff();
  console.log(dat);
  return (
    <div className='flex-1'>
      <h1>This is a solid page</h1>
    </div>
  );
};

export default Pages;
