import React from "react";

export function ProgressBar(props)  {
  const { bgcolor, completed } = props;
  return (
    <div>
      <div>
        {/* <label for="file">Downloading progress:</label> */}
<progress className="game-progress" value={completed} max="100">  </progress>
      </div>
    </div>
  );
};

