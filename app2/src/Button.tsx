import React, { useEffect, useState } from "react";

export function Button() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("hydration ok");
  }, []);

  return (
    <div>
      <h2>Remote Button</h2>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      </div>
    </div>
  );
}

export default Button;
