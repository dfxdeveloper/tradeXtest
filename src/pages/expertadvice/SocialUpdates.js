import React from "react";
import { Heart, Share2, MessageCircle, Bookmark } from "lucide-react";

const posts = [
  {
    username: "cryptoqueen",
    time: "2h ago",
    text: "Just analyzed the latest crypto trends\nRemember:\nAlways DYOR (Do Your Own Research) before investing!",
    hashtags: "#FinTech #Crypto #InvestingTips #FinTech #Crypto #InvestingTips",
    avatar: "https://s3-alpha-sig.figma.com/img/50e2/bbc2/3961dfb1fb031d40ddc0d9f18d6f6392?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T92gvlGQodVBFPnk24ITHi2qXdIVuukeJDJgYg3yJIRLFCcSrgsv4jF2hJkYvJDAaPputHhkNhEqbvoGCi0QC91BVqCtDv08FBG8Gi14LSscx~m6~g6Vz~gu0hLjwtLoZIv1J1LuX-GkuEMs3yQYPK45C2eaC~CNaMbjF5M34sHecjld7GLxztKyIEEE5Kq0KgPbxyDGfSkRddAo-jBHIUYMOvLEUPpyyjgFN5UkVSRRNk3o-sizROaWnyOQhoOraZvzVfi6SLjvXVD82rPaWa7xiHA-BZhzoog-Gfzxvf~Pt0NE9GXUidJDB69kywZ-qznMS4XTCuxcRFIKXwD2Jw__",
  },
  {
    username: "cryptoqueen",
    time: "2h ago",
    text: "Just analyzed the latest crypto trends\nRemember:\nAlways DYOR (Do Your Own Research) before investing!",
    hashtags: "#FinTech #Crypto #InvestingTips #FinTech #Crypto #InvestingTips",
    avatar: "https://s3-alpha-sig.figma.com/img/50e2/bbc2/3961dfb1fb031d40ddc0d9f18d6f6392?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T92gvlGQodVBFPnk24ITHi2qXdIVuukeJDJgYg3yJIRLFCcSrgsv4jF2hJkYvJDAaPputHhkNhEqbvoGCi0QC91BVqCtDv08FBG8Gi14LSscx~m6~g6Vz~gu0hLjwtLoZIv1J1LuX-GkuEMs3yQYPK45C2eaC~CNaMbjF5M34sHecjld7GLxztKyIEEE5Kq0KgPbxyDGfSkRddAo-jBHIUYMOvLEUPpyyjgFN5UkVSRRNk3o-sizROaWnyOQhoOraZvzVfi6SLjvXVD82rPaWa7xiHA-BZhzoog-Gfzxvf~Pt0NE9GXUidJDB69kywZ-qznMS4XTCuxcRFIKXwD2Jw__",
  },
  {
    username: "cryptoqueen",
    time: "2h ago",
    text: "Just analyzed the latest crypto trends\nRemember:\nAlways DYOR (Do Your Own Research) before investing!",
    hashtags: "#FinTech #Crypto #InvestingTips #FinTech #Crypto #InvestingTips",
    avatar: "https://s3-alpha-sig.figma.com/img/50e2/bbc2/3961dfb1fb031d40ddc0d9f18d6f6392?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T92gvlGQodVBFPnk24ITHi2qXdIVuukeJDJgYg3yJIRLFCcSrgsv4jF2hJkYvJDAaPputHhkNhEqbvoGCi0QC91BVqCtDv08FBG8Gi14LSscx~m6~g6Vz~gu0hLjwtLoZIv1J1LuX-GkuEMs3yQYPK45C2eaC~CNaMbjF5M34sHecjld7GLxztKyIEEE5Kq0KgPbxyDGfSkRddAo-jBHIUYMOvLEUPpyyjgFN5UkVSRRNk3o-sizROaWnyOQhoOraZvzVfi6SLjvXVD82rPaWa7xiHA-BZhzoog-Gfzxvf~Pt0NE9GXUidJDB69kywZ-qznMS4XTCuxcRFIKXwD2Jw__",
  },
];

const SocialUpdates = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-7xl p-6">
        <h2 className="text-white text-xl font-semibold mb-6">Social Updates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-[#F6F3FF] to-[#CD9CF2] p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={post.avatar} 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-black">{post.username}</h3>
                  <p className="text-sm text-[#6A11CB]">{post.time}</p>
                </div>
              </div>
              <p className="text-[#220C39] font-semibold mb-4 whitespace-pre-line">
                {post.text}
              </p>
              <p className="text-sm text-[#6A11CB]">{post.hashtags}</p>
              <div className="flex justify-between items-center mt-4 px-2">
                <button className="hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 text-black/80" />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5 text-black/80" />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-black/80" />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <Bookmark className="w-5 h-5 text-black/80" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialUpdates;