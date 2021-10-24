import React, {
  cloneElement,
  Fragment,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import "./tooltip.css";

const TooltipContent = memo(
  ({ content, position, tooltipClass, positionEl }) => {
    const tooltipEl = useRef();
    const targetEl = document.getElementById("root");
    useEffect(() => {
      const el = tooltipEl.current;

      setTimeout(() => {
        if (position === "top") {
          el.style.top = `${positionEl.top - el.clientHeight}px`;
          el.style.left = `${positionEl.left}px`;
          el.style.transform = `translate(-50%, -15px)`;
        } else if (position === "bottom") {
          el.style.top = `${positionEl.top}px`;
          el.style.left = `${positionEl.left}px`;
          el.style.transform = `translate(-50%, 15px)`;
        } else if (position === "left") {
          el.style.top = `${positionEl.top}px`;
          el.style.left = `${positionEl.left - el.clientWidth}px`;
          el.style.transform = `translate(-15px, -50%)`;
        } else if (position === "right") {
          el.style.top = `${positionEl.top}px`;
          el.style.left = `${positionEl.left}px`;
          el.style.transform = `translate(15px, -50%)`;
        }
        el.style.opacity = "1";
      }, 100);
    }, [position, positionEl.left, positionEl.top]);

    const output = (
      <div className={tooltipClass} ref={tooltipEl}>
        {content}
      </div>
    );

    return targetEl ? ReactDOM.createPortal(output, targetEl) : output;
  },
  []
);

const Tooltip = ({ children, content, position }) => {
  const [positionEl, setPositionEl] = useState({ top: 0, left: 0 });
  const [show, setShow] = useState(false);
  let tooltipClass = "tooltip";
  const getPosition = (e) => {
    const pos = e.currentTarget.getBoundingClientRect();
    if (position === "top") {
      setPositionEl({ top: pos.top, left: pos.left + pos.width / 2 });
    } else if (position === "left") {
      setPositionEl({ top: pos.top + pos.height / 2, left: pos.left });
    } else if (position === "bottom") {
      setPositionEl({ top: pos.bottom, left: pos.left + pos.width / 2 });
    } else if (position === "right") {
      setPositionEl({
        top: pos.top + pos.height / 2,
        left: pos.left + pos.width,
      });
    }
    setShow(true);
  };

  if (position === "top") {
    tooltipClass += " tooltip--top";
  } else if (position === "left") {
    tooltipClass += " tooltip--left";
  } else if (position === "bottom") {
    tooltipClass += " tooltip--bottom";
  } else if (position === "right") {
    tooltipClass += " tooltip--right";
  }

  return (
    <Fragment>
      {show && (
        <TooltipContent
          content={content}
          positionEl={positionEl}
          tooltipClass={tooltipClass}
          position={position}
        />
      )}
      {cloneElement(children, {
        onMouseLeave: () => setShow(false),
        onMouseOver: getPosition,
        ...children.props,
      })}
    </Fragment>
  );
};
export default Tooltip;
