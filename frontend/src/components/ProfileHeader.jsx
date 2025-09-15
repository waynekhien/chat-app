import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnable, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = async () => {
        const base64Image = reader.result
        setSelectedImg(base64Image)
        await updateProfile({profilePic: base64Image})
    }
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVARTAR */}
          <div className="avatar online">
            <button
              className="size-20 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* USERNAME & ONLINE */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          {/* LOGGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnable ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
