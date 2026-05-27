import {
  setLoading,
  setError,
  setActiveProjectId,
  setAllProjects,
  addProject,
  addConversationToProject,
  renameProject,
  deleteProject,
} from "../Redux/project.slice";

import {
  createProject as createProjectApi,
  getAllProjects as getAllProjectsApi,
  getOneProject as getOneProjectApi,
  addConversationToProject as addConversationToProjectApi,
  deleteProject as deleteProjectApi,
  renameProject as renameProjectApi,
} from "../Services/project.service";

import { useDispatch } from "react-redux";

export const useProject = () => {
  const dispatch = useDispatch();

  /* ---------------- CREATE ---------------- */

  const createProjectHook = async ({
    title,
  }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data =
        await createProjectApi({
          title,
        });

      if (!data?.success) {
        dispatch(
          setError(data?.message)
        );
        return;
      }

      dispatch(
        addProject(data.data)
      );

      return data;
    } catch (err) {
      dispatch(
        setError(err?.message)
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  /* ---------------- GET ALL ---------------- */

  const getAllProjectsHook =
    async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data =
          await getAllProjectsApi();

        if (!data?.success) {
          dispatch(
            setError(
              data?.message
            )
          );
          return;
        }

        dispatch(
          setAllProjects(
            data.data
          )
        );

        return data;
      } catch (err) {
        dispatch(
          setError(
            err?.message
          )
        );
      } finally {
        dispatch(
          setLoading(false)
        );
      }
    };

  /* ---------------- GET ONE ---------------- */

  const getOneProjectHook =
    async ({ projectId }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data =
          await getOneProjectApi({
            projectId,
          });

        if (!data?.success) {
          dispatch(
            setError(
              data?.message
            )
          );
          return;
        }

        dispatch(
          setActiveProjectId(
            projectId
          )
        );

        return data;
      } catch (err) {
        dispatch(
          setError(
            err?.message
          )
        );
      } finally {
        dispatch(
          setLoading(false)
        );
      }
    };

  /* ---------------- ADD CHAT ---------------- */

  const addConversationToProjectHook =
    async ({
      projectId,
      conversationId,
    }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data =
          await addConversationToProjectApi(
            {
              projectId,
              conversationId,
            }
          );

        if (!data?.success) {
          dispatch(
            setError(
              data?.message
            )
          );
          return;
        }

        dispatch(
          addConversationToProject(
            {
              projectId,
              conversationId,
            }
          )
        );

        return data;
      } catch (err) {
        dispatch(
          setError(
            err?.message
          )
        );
      } finally {
        dispatch(
          setLoading(false)
        );
      }
    };

  /* ---------------- RENAME ---------------- */

  const renameProjectHook =
    async ({
      projectId,
      title,
    }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data =
          await renameProjectApi(
            {
              projectId,
              title,
            }
          );

        if (!data?.success) {
          dispatch(
            setError(
              data?.message
            )
          );
          return;
        }

        dispatch(
          renameProject({
            projectId,
            title,
          })
        );

        return data;
      } catch (err) {
        dispatch(
          setError(
            err?.message
          )
        );
      } finally {
        dispatch(
          setLoading(false)
        );
      }
    };

  /* ---------------- DELETE ---------------- */

  const deleteProjectHook =
    async ({
      projectId,
    }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data =
          await deleteProjectApi(
            {
              projectId,
            }
          );

        if (!data?.success) {
          dispatch(
            setError(
              data?.message
            )
          );
          return;
        }

        dispatch(
          deleteProject(
            projectId
          )
        );

        return data;
      } catch (err) {
        dispatch(
          setError(
            err?.message
          )
        );
      } finally {
        dispatch(
          setLoading(false)
        );
      }
    };

  return {
    createProjectHook,
    getAllProjectsHook,
    getOneProjectHook,
    addConversationToProjectHook,
    renameProjectHook,
    deleteProjectHook,
  };
};