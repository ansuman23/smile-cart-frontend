import React, { useEffect } from "react";

import axios from "axios";

const Temp = () => {
  const dataFetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetching();
  }, []);

  return <div />;
};

export default Temp;
