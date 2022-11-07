import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ReduxState = (OriginalComponent, entity) => {
  function NewComponent() {
    const selector = useSelector((state) => state[entity]);
    const dispatch = useDispatch();
    return <OriginalComponent state={selector} dispatch={dispatch} />;
  }
  return NewComponent;
};

export default ReduxState;
