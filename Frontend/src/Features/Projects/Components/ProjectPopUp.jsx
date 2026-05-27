import React, { useState } from "react";
import {
  FolderPlus,
  ChevronRight,
  Archive,
  Trash2,
  Folder,
} from "lucide-react";

const ActionMenu = ({
  projects = [],
  onMoveToProject,
  onArchive,
  onDelete,
}) => {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="w-64 ml-56 rounded-2xl border border-orange-100 bg-white p-2 shadow-xl">
      {/* Move to Project */}
      <button
        onClick={() => setShowProjects(!showProjects)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <div className="flex items-center gap-3">
          <FolderPlus size={17} />
          <span>Move to project</span>
        </div>

        <ChevronRight
          size={16}
          className={`transition ${
            showProjects ? "rotate-90 text-orange-500" : ""
          }`}
        />
      </button>

      {/* Project List */}
      {showProjects && (
        <div className="mt-1 ml-4 border-l border-orange-100 pl-3">
          {projects.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-400">
              No projects yet
            </div>
          ) : (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onMoveToProject(project)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                <Folder size={16} className="text-orange-500" />
                <span>{project.name}</span>
              </button>
            ))
          )}
        </div>
      )}

      {/* divider */}
      <div className="mx-3 my-2 border-b border-orange-100" />

      {/* Archive */}
      <button
        onClick={onArchive}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <Archive size={17} />
        Archive
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-orange-600 transition hover:bg-orange-50"
      >
        <Trash2 size={17} />
        Delete
      </button>
    </div>
  );
};

export default ActionMenu;