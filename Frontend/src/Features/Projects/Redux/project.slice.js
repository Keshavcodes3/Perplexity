import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",

    initialState: {
        activeProject: null,
        projects: [],
        loading: false,
        error: null,
    },

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setActiveProjectId: (state, action) => {
            const projectId = action.payload;
            if (!projectId) {
                state.activeProject = null;
                return;
            }
            state.activeProject = state.projects.find(p => p._id === projectId) || null;
        },

        setAllProjects: (state, action) => {
            state.projects = action.payload;
        },

        addProject: (state, action) => {
            state.projects.push(action.payload);
        },

        addConversationToProject: (state, action) => {
            const { projectId, conversationId } = action.payload;
            const project = state.projects.find(p => p._id === projectId);
            if (project) {
                if (!project.conversations) {
                    project.conversations = [];
                }
                project.conversations.unshift(conversationId);
            }
            if (state.activeProject && state.activeProject._id === projectId) {
                if (!state.activeProject.conversations) {
                    state.activeProject.conversations = [];
                }
                state.activeProject.conversations.unshift(conversationId);
            }
        },

        renameProject: (state, action) => {
            const { projectId, title } = action.payload;
            const project = state.projects.find(p => p._id === projectId);
            if (project) {
                project.title = title;
            }
            if (state.activeProject && state.activeProject._id === projectId) {
                state.activeProject.title = title;
            }
        },

        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p._id !== action.payload);
            if (state.activeProject && state.activeProject._id === action.payload) {
                state.activeProject = null;
            }
        },
    },
});

export const {
    setLoading,
    setError,
    setActiveProjectId,
    setAllProjects,
    addProject,
    addConversationToProject,
    renameProject,
    deleteProject,
} = projectSlice.actions;

export default projectSlice.reducer;