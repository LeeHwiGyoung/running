'use client';

import { useState } from "react";

export default function RunningGoalInput() {
  const [goal, setGoal] = useState(0);

  return (
    <div>
        <label htmlFor="runningGoal">

        </label>
        <input id='runningGoal' type="number" name='runningGoal' placeholder={goal.toString()}/>
    </div>
  )
}
