import React from "react";
import axios from "axios";
import Task from "./Task";
import { getURL } from "./utils";
import { useState, useEffect } from "react";

export default function AllTasks() {
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: getURL() + "/api/instances",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setTasksList(response.data);
      })
      .catch((err) => {});
  }, []);

  const [renderingCards, setRenderingCards] = useState([]);

  useEffect(() => {
    for (let i = 0; i < tasksList.length; i++) {
      let card = <Task id={tasksList[i].id} task={tasksList[i].task} />;
      setRenderingCards((prevCards) => {
        return [...prevCards, card];
      });
    }
  }, [tasksList]);

  return (
    <div>
      {renderingCards.map((task) => {
        return <div key={task.id}>{task}</div>;
      })}
    </div>
  );
}
