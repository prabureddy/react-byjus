import React, { useEffect, memo } from "react";

const Modal = (props) => {
  
  if (props.isHidden) return null;

  const id = props.id;

  useEffect(() => {
    const selectedElement = $("div#" + id);
    selectedElement.iziModal();
    selectedElement.iziModal("open");
  }, [id]);
  
  return (
    <div
      id={id}
      data-izimodal-fullscreen={props.fullscreen}
      data-izimodal-title={props.title}
      data-izimodal-subtitle={props.subtitle}
      data-izimodal-icon={props.icon}
    >
      {props.children}
    </div>
  );
};

export default memo(Modal);
