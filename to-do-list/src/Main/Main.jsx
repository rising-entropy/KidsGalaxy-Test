import React from 'react'
import AddTask from './AddTask'
import AllTasks from './AllTasks'

export default function Main() {
    return (
        <div className="text-center container container-fluid" style={{margin: '2% auto'}}>
            <h1>To-Do List</h1>
            <h3>Kids Galaxy Tech-Test</h3>
            <br />
            <AddTask/>
            <AllTasks/>
        </div>
    )
}
