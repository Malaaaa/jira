import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import BoardScreen from "screens/board";
import EpicScreen from "screens/epic";

const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"/board"}>board</Link>
      <Link to={"/epic"}>epic</Link>
      <Routes>
        {/*projects/:projectId/board*/}
        <Route path={"/board"} element={<BoardScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"/epic"} element={<EpicScreen />} />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
