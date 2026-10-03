import { ArrowLeft, Settings, Home, MessageSquare, Mic, User } from 'lucide-react';

export default function ProfilePage() {
  const MenuBtn = ({ icon, title }: { icon: string, title: string }) => (
    <div className="relative bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] border border-[#C9A86A]/60 rounded-[16px] p-4 flex items-center gap-3 h-[85px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
      <div className="w-[52px] h-[52px] flex items-center justify-center text-[32px] drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]">
        {icon}
      </div>
      <span className="text-[#E5C88A] font-medium text-[15px]">{title}</span>
      <div className="absolute inset-0 rounded-[16px] shadow-[0_0_12px_rgba(201,168,106,0.15)] pointer-events-none"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center">
      <div className="w-full max-w-[390px] bg-[#0A0A0A] min-h-screen relative overflow-hidden border-x border-[#C9A86A]/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")`}}></div>

        <div className="relative z-10 p-5 pb-28">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <ArrowLeft className="text-[#C9A86A] w-6 h-6" />
            <Settings className="text-[#C9A86A] w-7 h-7" />
          </div>

          {/* Diamond Avatar */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative w-[110px] h-[110px] flex items-center justify-center">
              <div className="absolute w-[95px] h-[95px] rotate-45 border border-[#C9A86A] shadow-[0_0_15px_rgba(201,168,106,0.6)]"></div>
              <div className="absolute w-[85px] h-[85px] rotate-45 border border-[#FFD700]/50"></div>
              <img src="https://i.pravatar.cc/300?img=12" className="w-[72px] h-[72px] rounded-full object-cover border border-[#C9A86A]" />
              <div className="absolute top-1 right-3 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_white] animate-pulse"></div>
            </div>
            <h1 className="text-[26px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#8B6508] mt-3">Ali Khan</h1>
            <p className="text-[#C9A86A]/80 text-[14px] tracking-wide">ID 8847592</p>
          </div>

          {/* Stats */}
          <div className="mt-6 bg-gradient-to-b from-[#1A1A1A] to-[#101010] border border-[#C9A86A]/70 rounded-[14px] flex justify-between px-2 py-4 shadow-[0_0_15px_rgba(201,168,106,0.2)]">
            <div className="flex-1 text-center border-r border-[#C9A86A]/20">
              <p className="text-[#FFD700] font-bold text-[20px]">128K</p>
              <p className="text-[#C9A86A]/70 text-[13px]">Followers</p>
            </div>
            <div className="flex-1 text-center border-r border-[#C9A86A]/20">
              <p className="text-[#FFD700] font-bold text-[20px]">1.2K</p>
              <p className="text-[#C9A86A]/70 text-[13px]">Following</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-[#FFD700] font-bold text-[20px]">1.5M</p>
              <p className="text-[#C9A86A]/70 text-[13px]">Likes</p>
            </div>
          </div>

          <h2 className="text-center text-[#C9A86A] tracking-[0.3em] mt-6 mb-4 text-[16px] font-serif">MENU</h2>

          {/* Menu Grid - Exact Same as Image */}
          <div className="grid grid-cols-2 gap-3.5">
            <MenuBtn icon="👛" title="My Wallet" />
            <MenuBtn icon="🌟" title="My Level" />
            <MenuBtn icon="🛍️" title="Mall/Store" />
            <MenuBtn icon="💸" title="Withdraw" />
            <MenuBtn icon="🛡️" title="Block List" />
            <MenuBtn icon="🏅" title="Host Badge" />
            <MenuBtn icon="👑" title="VIP Level" />
            <MenuBtn icon="🎁" title="Invite & Earn" />
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-gradient-to-b from-[#1E1E1E] to-[#0F0F0F] border border-[#C9A86A]/60 rounded-full flex justify-around items-center py-2.5 px-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center text-[#8B7355]"><Home className="w-6 h-6" /><span className="text-[11px] mt-1">Home</span></div>
          <div className="flex flex-col items-center text-[#8B7355]"><MessageSquare className="w-6 h-6" /><span className="text-[11px] mt-1">Inbox</span></div>
          <div className="flex flex-col items-center text-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"><Mic className="w-6 h-6" /><span className="text-[11px] mt-1">Mic Live</span></div>
          <div className="flex flex-col items-center bg-[#C9A86A] text-black rounded-2xl px-4 py-1.5 shadow-[0_0_12px_rgba(201,168,106,0.7)]"><User className="w-6 h-6" /><span className="text-[11px] mt-1 font-bold">Profile</span></div>
        </div>
      </div>
    </div>
  );
}
