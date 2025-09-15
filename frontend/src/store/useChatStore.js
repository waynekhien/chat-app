import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnable: localStorage.getItem("isSoundEnable") === "true",

    toggleSound: () => {
        const newSoundState = !get().isSoundEnable;
        localStorage.setItem("isSoundEnable", newSoundState.toString());
        set({isSoundEnable: newSoundState});
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => set({selectedUser}),
    
    getAllContact: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts : res.data})

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMyChatPartner: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats : res.data})

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading: false})
        }
    },
}))