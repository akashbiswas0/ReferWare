// @ts-nocheck
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useBrandData } from "@/store";
import { updateBrandData } from "@/appwrite/utils";
import appwriteService from "@/appwrite/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function ProfileSetting() {
  const { user, isAuthenticated, setShowAuthFlow, handleLogOut } =
    useDynamicContext();
  const router = useRouter();
  const [newName, setNewName] = useState(useBrandData.getState().name);
  const [newDesc, setNewDesc] = useState(useBrandData.getState().description);
  const [newWebsite, setNewWebsite] = useState(useBrandData.getState().website);
  const [newApiKey, setNewApiKey] = useState(useBrandData.getState().api_key);
  const [newProfileImg, setNewProfileImg] = useState(
    useBrandData.getState().profile_img
  );
  const fileInputRef = useRef(null);
  const showToastMessage = () => {
    toast("Update Sucessfull");
  };
  const settingsLogout = async () => {
    handleLogOut();
    const res = await appwriteService.logout();
    console.log(res);
    return true;
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const res = await appwriteService.uploadProilePic(file);
      console.log(res.href);
      setNewProfileImg(res.href);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-3xl text-white font-bold">Brand Name</label>
          <input
            type="text"
            id="event-name"
            placeholder="Name"
            value={newName}
            className="bg-[#27292D] text-lg rounded-2xl p-4 text-white  w-[50%]"
            onChange={(e) => {
              setNewName(e.target.value);
              console.log(newName);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-3xl text-white font-bold">
            Brand Description
          </label>
          <textarea
            placeholder="Description..."
            rows={4}
            className="bg-[#27292D] rounded-2xl p-4 text-white resize-none w-[50%]"
            value={newDesc}
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-3xl text-white font-bold">Website Link</label>
          <input
            type="text"
            id="event-name"
            placeholder="Link"
            className="bg-[#27292D] text-lg rounded-2xl p-4 text-white  w-[50%]"
            value={newWebsite}
            onChange={(e) => {
              setNewWebsite(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-3xl text-white font-bold">Api Key</label>
          <input
            type="text"
            id="event-name"
            placeholder="Link"
            className="bg-[#27292D] text-lg rounded-2xl p-4 text-white  w-[50%]"
            value={newApiKey}
            onChange={(e) => {
              setNewApiKey(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-white font-bold">Brand Logo</p>
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
            />
            <Image
              src={newProfileImg}
              width="252"
              height="300"
              className="w-[10%] cursor-pointer"
              alt="Ref3r logo"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </div>
      {/* <div className="w-[70%] flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl text-white font-bold">
            Profile Visibility
          </div>
          <input
            type="text"
            id="event-name"
            placeholder="Peter Griffin"
            className="bg-[#27292D] text-lg rounded-2xl p-4 text-white  w-[50%]"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl text-white font-bold">
            Partnerships Visibility
          </div>
          <input
            type="text"
            id="event-name"
            placeholder="Peter Griffin"
            className="bg-[#27292D] text-lg rounded-2xl p-4 text-white  w-[50%]"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl text-white font-bold">
            Follower Count Visibility
          </div>
          <input
            type="text"
            id="event-name"
            placeholder="Peter Griffin"
            className="bg-[#27292D] text-lg rounded-2xl p-4 text-white  w-[50%]"
          />
        </div>
      </div>

      <div className="flex flex-col w-[65%]">
        <div className="flex justify-between items-center">
          <p className="text-white text-lg">Connect/Disconnect Social Media</p>
          <button className="text-[#3572EF] text-xl font-medium px-4 py-2 border-2 border-[#3572EF] rounded-lg">
            Social Media Accounts
          </button>
        </div>
      </div> */}
      <div className="gap-4 flex ">
        <button
          className="bg-[#3572EF] p-3 text-lg font-semibold text-white rounded-xl min-w-[15%]"
          onClick={async () => {
            useBrandData.setState({
              name: newName,
              description: newDesc,
              website: newWebsite,
              api_key: newApiKey,
              profile_img: newProfileImg,
            });
            const res = await updateBrandData();
            if (res) {
              showToastMessage();
            }
          }}
        >
          Save Changes
        </button>
        <button
          onClick={() => {
            const res = settingsLogout();
            if (res) {
              router.push("/");
            }
          }}
          className="p-3 text-lg font-semibold hover:text-white rounded-xl min-w-[15%] bg-white hover:bg-red-700 "
        >
          LOGOUT
        </button>
      </div>
      <ToastContainer></ToastContainer>{" "}
    </div>
  );
}

export default ProfileSetting;
