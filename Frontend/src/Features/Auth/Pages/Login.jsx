import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {handleLogin}=useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const user=useSelector(state=>state.auth.user)
  const loading=useSelector(state=>state.auth.loading)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate()
  const payload={
    email:form.email,
    password:form.password

  }
  if(!loading && user){
    navigate('/')
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleLogin(payload);
    if(user){
        navigate('/')
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-black rounded-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-black text-center">
          Welcome back
        </h1>
        <p className="text-sm text-black/60 text-center mt-2">
          Log in to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-black rounded-lg bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          {/* Password */}
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

          <div className="flex justify-end">
            <span className="text-sm text-black/60 hover:text-black cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg transition flex items-center justify-center disabled:opacity-70 hover:bg-black/90"
          >

              <div className="w-5 h-5  border-white border-t-transparent  " />
              Log in

          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-black" />
          <span className="text-xs text-black/60">OR</span>
          <div className="flex-1 h-px bg-black" />
        </div>

        {/* Social */}
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
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}