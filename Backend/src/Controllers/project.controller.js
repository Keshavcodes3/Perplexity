import ConversationModel from "../Models/conversation.model.js";
import chatModel from "../Models/chat.model.js";
import projectModel from "../Models/Project.model.js";
import UserModel from "../Models/user.model.js";

export const createProject = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const { projectName } = req.body
        if (!projectName) {
            return res.status(400).json({
                message: "Project Name must be valid ",
                success: false
            })
        }
        const isProjectAlreadyExist = await projectModel.findOne({ title: projectName })
        if (isProjectAlreadyExist) {
            return res.status(400).json({
                message: "Project already exist with the name , try another name",
                success: false
            })
        }
        const project = await projectModel.create({
            title: projectName,
            userId: userId
        })
        return res.status(201).json({
            message: "Project created successfully",
            success: true,
            data: project
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}


export const addConversationToProject = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }

        const { projectId } = req.params
        const { conversationId } = req.body
        const project = await projectModel.findById(projectId).select('+title')
        if (!project) {
            return res.status(400).json({
                message: "Please provide a project id or create new one",
                success: false
            })
        }
        const conversation = await ConversationModel.findById(conversationId)
        if (!conversation) {
            return res.status(400).json({
                message: "No conversation found",
                success: false
            })
        }

        await ConversationModel.findByIdAndUpdate(conversationId, {
            $set: {
                projectId: projectId
            }
        })
        return res.status(200).json({
            message: "Successfully added to project",
            data: {
                projectName: project.title,
                conversationTitle: conversation.title
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}


export const viewAllProjects = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const allProjects = await projectModel.find({ userId: userId }).select('+title').sort({ createdAt: -1 })

        if (!allProjects) {
            return res.status(200).json({
                message: "No project found",
                success: true
            })
        }
        return res.status(200).json({
            message: "All project fetched successfully",
            success: true,
            data: allProjects
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const { projectId } = req.params
        if (!projectId) {
            return res.status(400).json({
                message: "No project Id provided",
                success: false
            })
        }
        const project = await projectModel.findById(projectId).select('+title')
        if (!project) {
            return res.status(400).json({
                message: "No project  Found , accessing a invalid project",
                success: false
            })
        }
        if (project.userId.toString() !== userId) {
            return res.status(403).json({
                message: "Unauthorized",
                success: false
            })
        }
        //First Task : remove the projectId from all convo that are on project

        const allConversationInProject = await ConversationModel.find({
            projectId: projectId
        })
        await ConversationModel.updateMany({
            projectId
        }, {
            $unset: { projectId: null }
        })
        //now delete the project
        await projectModel.findByIdAndDelete(projectId)
        return res.status(200).json({
            message: "Project deleted successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}


export const viewOneProject = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const { projectId } = req.params
        if (!projectId) {
            return res.status(400).json({
                message: "No project Id provided",
                success: false
            })
        }
        const project = await projectModel.findById(projectId).select('+title')
        if (!project) {
            return res.status(400).json({
                message: "No project  Found , accessing a invalid project",
                success: false
            })
        }
        if (project.userId.toString() !== userId) {
            return res.status(403).json({
                message: "Unauthorized",
                success: false
            })
        }
        const allConversation = await ConversationModel.find({
            projectId: projectId
        })
        return res.status(200).json({
            message: "All project fetched successfully",
            data: {
                project: project,
                allConversation: allConversation
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}



export const renameProject = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const { projectId } = req.params
        if (!projectId) {
            return res.status(400).json({
                message: "No project Id provided",
                success: false
            })
        }
        const project = await projectModel.findById(projectId).select('+title')
        if (!project) {
            return res.status(400).json({
                message: "No project  Found , accessing a invalid project",
                success: false
            })
        }
        if (project.userId.toString() !== userId) {
            return res.status(403).json({
                message: "Unauthorized",
                success: false
            })
        }
        const title = req.body.newTitle?.trim()
        if (!title) {
            return res.status(400).json({
                message: "No title provided",
                success: false
            })
        }
        const updatedProject = await projectModel.findByIdAndUpdate(projectId,
            { $set: { title } }, { new: true }
        )
        return res.status(200).json({
            message: "Project renamed successfully",
            success: true,
            data: {
                project: updatedProject
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}