import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../Features/Authentication/Redux/auth.slice.js";

const ProtectSkeleton = () => {
    const messageRows = [72, 88, 56];

    return (
        <div className="min-h-screen w-full overflow-hidden bg-slate-950 text-white">
            <div className="flex h-screen">
                <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-900/80 p-4 md:block">
                    <div className="mb-8 h-10 w-36 animate-pulse rounded-lg bg-white/10" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="h-12 animate-pulse rounded-lg bg-white/10"
                                style={{ animationDelay: `${item * 80}ms` }}
                            />
                        ))}
                    </div>
                </aside>

                <main className="flex min-w-0 flex-1 flex-col">
                    <header className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                        <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
                        <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
                    </header>

                    <section className="flex flex-1 items-center justify-center px-5">
                        <div className="w-full max-w-3xl space-y-6">
                            <div className="mx-auto h-14 w-14 animate-pulse rounded-2xl bg-cyan-400/30 shadow-[0_0_45px_rgba(34,211,238,0.35)]" />
                            <div className="mx-auto h-7 w-64 animate-pulse rounded bg-white/10" />
                            <div className="space-y-4">
                                {messageRows.map((width, index) => (
                                    <div
                                        key={width}
                                        className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                                    >
                                        <div
                                            className="mb-3 h-4 animate-pulse rounded bg-white/10"
                                            style={{ width: `${width}%`, animationDelay: `${index * 120}ms` }}
                                        />
                                        <div
                                            className="h-4 animate-pulse rounded bg-cyan-200/10"
                                            style={{ width: `${Math.max(width - 18, 34)}%`, animationDelay: `${index * 160}ms` }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

const Protect = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const [hasVerifiedUser, setHasVerifiedUser] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            return;
        }

        let isActive = true;

        dispatch(fetchMe()).finally(() => {
            if (isActive) {
                setHasVerifiedUser(true);
            }
        });

        return () => {
            isActive = false;
        };
    }, [dispatch, isAuthenticated, user]);

    if (isAuthenticated && user) {
        return children || <Outlet />;
    }

    if (loading || !hasVerifiedUser) {
        return <ProtectSkeleton />;
    }

    return <Navigate to="/login" replace state={{ from: location }} />;
};

export default Protect;
