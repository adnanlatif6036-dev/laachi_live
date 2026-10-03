import { ArrowLeft, Settings, Home, MessageSquare, Mic, User, Shield, Backpack, Clock, MessageCircle, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const menuItems = [
    { icon: Shield, title: 'My Badges' },
    { icon: Backpack, title: 'Backpack' },
    { icon: Clock, title: 'My History' },
    { icon: MessageCircle, title: 'Feedback' },
    { icon: Settings, title: 'Settings' },
    { icon: LogOut, title: 'Logout' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] flex justify-center text-white">
      <div className="w-full max-w-[390px] bg-[#0A0A0A] min-h-screen relative border-x border-[#C9A86A]/20 pb-[80px]">

        <div className="flex items-center justify-between p-4 pt-8">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#C9A86A]/30 flex items-center justify-center">
            <ArrowLeft size={18} className="text-[#C9A86A]" />
          </div>
          <h1 className="text-[#C9A86A] font-bold tracking-widest text-[16px]">PROFILE</h1>
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#C9A86A]/30 flex items-center justify-center">
            <Settings size={18} className="text-[#C9A86A]" />
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className="w-[110px] h-[110px] bg-gradient-to-br from-[#C9A86A] to-[#8B6A2A] p-[2px] rounded-[22px] shadow-[0_0_20px_rgba(201,168,106,0.5)] rotate-45">
            <div className="w-full h-full bg-[#1A1A1A] rounded-[20px] flex items-center justify-center -rotate-45 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=12" className="w-[85px] h-[85px] rounded-full object-cover" alt="profile" />
            </div>
          </div>
          <h2 className="mt-8 text-[20px] font-bold text-[#E5C88A]">Adnan Latif</h2>
          <p className="text-[#C9A86A]/60 text-[13px]">ID: 6036 • Level 25</p>

          <div className="flex gap-3 mt-5">
            <div className="bg-[#1A1A1A] border border-[#C9A86A]/20 rounded-full px-4 py-1.5 text-[12px] text-[#E5C88A]">12.5K Followers</div>
            <div className="bg-[#1A1A1A] border border-[#C9A86A]/20 rounded-full px-4 py-1.5 text-[12px] text-[#E5C88A]">850 Following</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 mt-6">
          {menuItems.map((item) => (
            <div key={item.title} className="bg-gradient-to-b from-[#1E1E1E] to-[#101010] border border-[#C9A86A]/40 rounded-[16px] p-4 flex items-center gap-3 h-[78px]">
              <div className="w-[40px] h-[40px] rounded-full bg-[#C9A86A]/10 flex items-center justify-center">
                <item.icon size={20} className="text-[#C9A86A]" />
              </div>
              <span className="text-[#E5C88A] text-[13px] font-medium">{item.title}</span>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[#111] border-t border-[#C9A86A]/20 flex justify-around py-3">
          <Home size={22} className="text-[#555]" />
          <MessageSquare size={22} className="text-[#555]" />
          <div className="w-10 h-10 bg-[#C9A86A] rounded-full flex items-center justify-center -mt-2"><Mic size={18} className="text-black"/></div>
          <Settings size={22} className="text-[#555]" />
          <User size={22} className="text-[#C9A86A]" />
        </div>
      </div>
    </div>
  );
}
