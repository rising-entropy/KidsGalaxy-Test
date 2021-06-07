import React from "react";
import axios from "axios";
import { getURL } from "./utils";
import { useState} from "react";

export default function Task(props) {
  const [showEdit, setShowEdit] = useState(false);

  const [task, setTask] = useState("");

  const taskHandler = (e) => {
    setTask(e.target.value);
  };

  const editHandler = () => {
    setShowEdit(!showEdit);
  };

  const deleteHandler = () => {
    axios
      .delete(getURL() + "/api/instance/" + props.id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.status === "202 Accepted") {
            window.location = "/";
          } else {
            alert("Some Error Occurred. We got this.");
          }
        }
      })
      .catch(() => {
        alert("Some Error Occurred. We got this.");
      });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    setShowEdit(!showEdit);

    const body = {
      task: task,
    };

    axios
      .put(getURL() + "/api/instance/" + props.id, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status === "202 Accepted") {
          window.location = "/";
        } else {
          alert("Some Error Occurred. We got this.");
        }
      })
      .catch(() => {
        alert("Some Error Occurred. We got this.");
      });
  };

  return (
    <div>
      <br />
      <h5>{props.task}</h5>
      <button onClick={editHandler}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
      <br />
      {showEdit ? (
        <form onSubmit={updateHandler}>
          <label htmlFor="task">Updated Task</label>
          <br />
          <input
            type="text"
            name="task"
            onChange={taskHandler}
            placeholder="Task Name"
            required
          />
          <button type="submit">Update</button>
        </form>
      ) : null}
    </div>
  );
}
