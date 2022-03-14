import { useEffect } from "react";

export const useEvent = (event, handler, passive = false) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};

export const getColors = (num) => {
  switch (num) {
    case 2:
      return "#DDBDFC";
    case 4:
      return "#DAB6FC";
    case 8:
      return "#CBB2FE";
    case 16:
      return "#BBADFF";
    case 32:
      return "#ADA7FF";
    case 64:
      return "#9FA0FF";
    case 128:
      return "#8E94F2";
    case 256:
      return "#8187DC";
    case 512:
      return "#757BC8";
    case 1024:
      return "#6368A9";
    case 2048:
      return "#4D5184";
    default:
      return "#E0C3FC";
  }
};