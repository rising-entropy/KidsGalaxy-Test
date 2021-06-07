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
    <div className="container-fluid" style={{margin: '2% auto', padding: '1% auto'}}>
      <br />
      <h5>{props.task}</h5>
      <button className="btn btn-primary" onClick={editHandler}>Edit</button>&nbsp;&nbsp;&nbsp;
      <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
      <br />
      {showEdit ? (
        <form onSubmit={updateHandler}>
            <br />
          <label htmlFor="task">Updated Task</label>
          <br />
          <input
            type="text"
            name="task"
            onChange={taskHandler}
            placeholder="Task Name"
            required
          />
          <br/><br />
          <button className="btn btn-success" type="submit">Update</button>
          <br />
        </form>
      ) : null}
    </div>
  );
}
