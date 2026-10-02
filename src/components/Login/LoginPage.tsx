import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

interface Props {
  onLogin: (name: string) => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="flex flex-col items-center mb-10">
          <div className="w-[180px] h-[180px] rounded-full p-[4px] bg-gradient-to-br from-[#ff1a8a] to-[#7b2cff]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <div className="text-[90px] font-black bg-gradient-to-br from-[#ff1a8a] to-[#7b2cff] bg-clip-text text-transparent -skew-x-12">L</div>
            </div>
          </div>
          <h1 className="text-[42px] font-light text-white mt-6">LaachiLive</h1>
          <p className="text-[#a0a0a0] text-[16px] mt-2">Connect · Talk · Live</p>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-[#b0b0b0] mb-2 block">Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a8a] w-6 h-6" />
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" className="w-full h-[56px] bg-[#222] border border-[#555] rounded-full pl-12 pr-4 text-white focus:border-[#ff3d9a] focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[#b0b0b0] mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a8a] w-6 h-6" />
              <input type={showPass? "text" : "password"} value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Enter your password" className="w-full h-[56px] bg-[#222] border border-[#555] rounded-full pl-12 pr-12 text-white focus:border-[#ff3d9a] focus:outline-none" />
              <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8a8a]">{showPass? <EyeOff/> : <Eye/>}</button>
            </div>
          </div>
          <button onClick={()=> onLogin(name || "Laachi User")} className="w-full h-[56px] rounded-full bg-gradient-to-r from-[#ff5ca8] to-[#8e2cff] text-white text-[20px] font-medium">Login</button>
        </div>
      </div>
    </div>
  );
}
