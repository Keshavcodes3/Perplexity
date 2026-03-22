import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your register API call here
      console.log(form);
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-black rounded-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-black text-center">
          Create your account
        </h1>
        <p className="text-sm text-black/60 text-center mt-2">
          Join and start building 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-black rounded-lg bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-black rounded-lg bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-lg bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-black/60"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg transition flex items-center justify-center disabled:opacity-70 hover:bg-black/90"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-black" />
          <span className="text-xs text-black/60">OR</span>
          <div className="flex-1 h-px bg-black" />
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          <button className="w-full border border-black py-3 rounded-lg hover:bg-black hover:text-white transition">
            Continue with Google
          </button>

          <button className="w-full border border-black py-3 rounded-lg hover:bg-black hover:text-white transition">
            Continue with GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-black/60 text-center mt-6">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-black font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}