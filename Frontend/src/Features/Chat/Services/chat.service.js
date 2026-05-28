import axios from "axios";
import { BASEURL } from "../../API/ApiStore";

const API = axios.create({
    baseURL: `${BASEURL}/api/conversations`,
    withCredentials: true,
});

export const streamStartChat = async (
    { message, mode = "casual" },
    onStart,
    onChunk,
    onDone,
    onError
) => {
    try {
        const response = await fetch(
            `${BASEURL}/api/conversations/`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                credentials: "include",

                // FIX → send mode
                body: JSON.stringify({
                    message,
                    mode,
                }),
            }
        );

        if (!response.ok) {
            const err =
                await response.json();

            throw new Error(
                err.message ||
                "Error starting chat"
            );
        }

        const reader =
            response.body.getReader();

        const decoder =
            new TextDecoder("utf-8");

        let buffer = "";

        while (true) {
            const { done, value } =
                await reader.read();

            if (done) break;

            buffer += decoder.decode(
                value,
                { stream: true }
            );

            const lines =
                buffer.split("\n");

            buffer = lines.pop();

            for (const line of lines) {
                if (!line.trim())
                    continue;

                try {
                    const data =
                        JSON.parse(line);

                    if (
                        data.type === "start"
                    ) {
                        onStart?.(data);
                    }

                    else if (
                        data.type === "chunk"
                    ) {
                        onChunk?.(
                            data.text
                        );
                    }

                    else if (
                        data.type === "done"
                    ) {
                        onDone?.(data);
                    }

                    else if (
                        data.type === "error"
                    ) {
                        throw new Error(
                            data.error ||
                            "Stream error"
                        );
                    }
                } catch (e) {
                    console.error(
                        "Parse error:",
                        line,
                        e
                    );

                    onError?.(
                        e.message
                    );
                }
            }
        }

        // FIX → last buffered line
        if (buffer.trim()) {
            const data =
                JSON.parse(buffer);

            if (
                data.type === "done"
            ) {
                onDone?.(data);
            }
        }
    } catch (err) {
        onError?.(
            err.message
        );
    }
};

export const streamTakeFollowUp =
    async (
        {
            conversationId,
            message,
            mode = "casual",
        },
        onChunk,
        onDone,
        onError
    ) => {
        try {
            const response =
                await fetch(
                    `${BASEURL}/api/conversations/sendMessage/${conversationId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        credentials:
                            "include",

                        // FIX → send mode
                        body: JSON.stringify({
                            message,
                            mode,
                        }),
                    }
                );

            if (!response.ok) {
                const err =
                    await response.json();

                throw new Error(
                    err.message ||
                    "Error sending message"
                );
            }

            const reader =
                response.body.getReader();

            const decoder =
                new TextDecoder("utf-8");

            let buffer = "";

            while (true) {
                const {
                    done,
                    value,
                } =
                    await reader.read();

                if (done) break;

                buffer +=
                    decoder.decode(
                        value,
                        {
                            stream: true,
                        }
                    );

                const lines =
                    buffer.split("\n");

                buffer =
                    lines.pop();

                for (const line of lines) {
                    if (!line.trim())
                        continue;

                    try {
                        const data =
                            JSON.parse(
                                line
                            );

                        if (
                            data.type ===
                            "chunk"
                        ) {
                            onChunk?.(
                                data.text
                            );
                        }

                        else if (
                            data.type ===
                            "done"
                        ) {
                            onDone?.(
                                data
                            );
                        }

                        else if (
                            data.type ===
                            "error"
                        ) {
                            throw new Error(
                                data.error ||
                                "Stream error"
                            );
                        }
                    } catch (e) {
                        console.error(
                            "Parse error:",
                            line,
                            e
                        );

                        onError?.(
                            e.message
                        );
                    }
                }
            }

            if (buffer.trim()) {
                const data =
                    JSON.parse(buffer);

                if (
                    data.type ===
                    "done"
                ) {
                    onDone?.(
                        data
                    );
                }
            }
        } catch (err) {
            onError?.(
                err.message
            );
        }
    };

export const deleteConversation =
    async (
        conversationId
    ) => {
        const response =
            await API.delete(
                `/delete/${conversationId}`
            );

        return response.data;
    };

export const getAllConversations =
    async () => {
        const response =
            await API.get("/all");

        return response.data;
    };

export const getAllMessages =
    async ({
        conversationId,
    }) => {
        const response =
            await API.get(
                `/${conversationId}`
            );

        return response.data;
    };

export const createEmptyConversationApi = async ({ mode }) => {
    const response = await API.post('/new', { mode });
    return response.data;
};

export const updateConversationModeApi = async ({ conversationId, mode }) => {
    const response = await API.patch(`/${conversationId}/mode`, { mode });
    return response.data;
};