import React from "react";
import axios from "axios";
import { getURL } from "./utils";
import { useState} from "react";

export default function AddTask() {
  const [task, setTask] = useState("");

  const taskHandler = (e) => {
    setTask(e.target.value);
  };

  const createHandler = (e) => {
    e.preventDefault();

    const body = {
      task: task,
    };

    axios
      .post(getURL() + "/api/instances", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.status === "200 OK") {
            window.location = "/";
          } else {
            alert("Some Error Occurred");
          }
        }
      })
      .catch(() => {
        alert("Some Error Occurred");
      });
  };

  return (
    <div>
      <form onSubmit={createHandler}>
        <label htmlFor="task">Enter New Task</label>
        <br />
        <input
          type="text"
          name="task"
          onChange={taskHandler}
          placeholder="Task Name"
          required
        />&nbsp;&nbsp;&nbsp;
        <button className="btn btn-success" type="submit">Add Task</button>
      </form>
      <br />
    </div>
  );
}
