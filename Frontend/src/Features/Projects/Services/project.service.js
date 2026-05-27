import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/project",
    withCredentials: true,
});

// Backend expects { projectName } for creation
export const createProject = async ({ title }) => {
    const { data } = await API.post("/", { projectName: title });
    return data;
};

export const getAllProjects = async () => {
    const { data } = await API.get("/");
    return data;
};

export const getOneProject = async ({ projectId }) => {
    const { data } = await API.get(`/${projectId}`);
    return data;
};

export const addConversationToProject = async ({ projectId, conversationId }) => {
    const { data } = await API.post(`/add/${projectId}`, { conversationId });
    return data;
};

export const deleteProject = async ({ projectId }) => {
    const { data } = await API.delete(`/${projectId}`);
    return data;
};

export const renameProject = async ({ projectId, title }) => {
    const { data } = await API.patch(`/rename/${projectId}`, { title });
    return data;
};