import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import "./Editor.css"

import EditPannel from "./EditPannel";

function Editor() {
  const [edit, setEdit] = useState(false);
  return (
    <div className="editor ">
      <div className="fixed top-16 left-4 z-10">
        {edit ? (
          <EditPannel setEdit={setEdit} />
        ) : (
          <BsPencil
            className="w-7 h-7 backdrop-blur-sm bg-white/30 rounded-md p-1 cursor-pointer"
            onClick={() => setEdit(true)}
          />
        )}
      </div>
    </div>
  );
}

export default Editor;
