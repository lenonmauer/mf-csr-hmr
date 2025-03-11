import React, { useEffect, useState, lazy } from "react";

const App2Button = lazy(() => import("app2/Button"));

export default function Button() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("hydration ok");
  }, []);

  return (
    <div>
      Shell page
      <div>
        <button onClick={() => setCount(count + 1)}>
          Shell Button {count}
        </button>

        <App2Button />
      </div>
    </div>
  );
}
