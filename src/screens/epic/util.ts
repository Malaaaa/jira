import { useProjectIdInUrl } from "screens/kanban/util";
import React from "react";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];
