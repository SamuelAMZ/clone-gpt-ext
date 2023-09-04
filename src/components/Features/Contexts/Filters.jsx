import React from "react";

// icons
import { IoFilter } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";

const Filters = () => {
  return (
    <div className="clonegpt-filters">
      <form>
        {/* icon */}
        <BsSearch />
        {/* search input */}
        <input type="text" placeholder="Search context" />
      </form>
      <div className="clonegpt-icons-conatiner">
        <IoFilter />
        <TbArrowsSort />
      </div>
    </div>
  );
};

export default Filters;
