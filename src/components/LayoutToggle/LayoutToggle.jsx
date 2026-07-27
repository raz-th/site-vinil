import { useState } from "react";
import "./LayoutToggle.css";
import { LuLayoutGrid } from "react-icons/lu";
import { TbLayoutList } from "react-icons/tb";

export default function LayoutToggle({ initialColumns = 2, onChange }) {
  const [columns, setColumns] = useState(initialColumns);

  const handleToggle = () => {
    const nextColumns = columns === 2 ? 1 : 2;
    setColumns(nextColumns);
    if (onChange) {
      onChange(nextColumns);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="layout-toggle-btn"
      aria-label="Schimbă modul de afișare"
    >
      <span className="layout-toggle-icon">
        {columns === 2 ? (
          <TbLayoutList />
        ) : (
          <LuLayoutGrid />
        )}
      </span>

      {/* <span>{columns === 2 ? "1 pe rând" : "2 pe rând"}</span> */}
    </button>
  );
}