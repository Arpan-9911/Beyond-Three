import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

const MobileHeader = ({ heading }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  })
  return (
    <>
      <div className="py-3 px-4 bg-white border-b border-gray-300 font-bold sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <h1>{heading}</h1>
          <button onClick={() => setOpen(!open)}>
            <FaBars size={20} />
          </button>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-64 h-dvh"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
