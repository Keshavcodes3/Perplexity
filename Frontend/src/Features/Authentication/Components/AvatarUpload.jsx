import { useRef } from "react";
import { Camera, UserRound } from "lucide-react";
import {
    AVATAR_ACCEPTED_TYPES,
    AVATAR_MAX_SIZE_MB,
} from "../Utils/constants.js";

const AvatarUpload = ({
    preview,
    onChange,
    error,
}) => {
    const inputRef = useRef(null);

    const handleFile = (event) => {
        const file =
            event.target.files?.[0];

        if (!file) return;

        if (
            !AVATAR_ACCEPTED_TYPES.includes(
                file.type
            )
        ) {
            onChange({
                file: null,
                preview: "",
                error:
                    "Use JPG, PNG, WEBP, or GIF.",
            });
            return;
        }

        if (
            file.size >
            AVATAR_MAX_SIZE_MB *
                1024 *
                1024
        ) {
            onChange({
                file: null,
                preview: "",
                error: `Image must be under ${AVATAR_MAX_SIZE_MB}MB.`,
            });
            return;
        }

        const reader =
            new FileReader();

        reader.onload = () => {
            onChange({
                file,
                preview:
                    reader.result,
                error: "",
            });
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">
                Profile photo
            </span>

            <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Avatar preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <UserRound className="h-8 w-8" />
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100"
                        aria-label="Upload avatar"
                    >
                        <Camera className="h-5 w-5 text-white" />
                    </button>
                </div>

                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-500"
                    >
                        Upload photo
                    </button>

                    <p className="text-xs text-slate-500">
                        Optional · Max{" "}
                        {
                            AVATAR_MAX_SIZE_MB
                        }
                        MB
                    </p>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept={AVATAR_ACCEPTED_TYPES.join(
                        ","
                    )}
                    onChange={
                        handleFile
                    }
                    className="hidden"
                />
            </div>

            {error && (
                <p className="text-xs text-rose-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default AvatarUpload;