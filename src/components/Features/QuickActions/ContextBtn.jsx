import React from "react";
// icons
import { MdOutlineWindow } from "react-icons/md";

const ContextBtn = () => {
  return (
    <button
      id="clonegpt-context-btn"
      className="btn relative btn-neutral border-0 md:border"
      as="button"
    >
      <div class="flex w-full gap-2 items-center justify-center">
        <MdOutlineWindow className="h-3 w-3 flex-shrink-0" />
        Generate context
      </div>
    </button>
  );
};

export default ContextBtn;
