import { useState } from "react";
import "./Accordian.css"

export default function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="accordion">
        <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
          <h2>{title}</h2>
          <span>{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && <div className="accordion-content">{children}</div>}
      </div>
    );
  }