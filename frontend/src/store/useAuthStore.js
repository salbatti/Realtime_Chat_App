import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3003" : "/";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateLoading:false,
    socket:null,
    onlineUsers:[],
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            console.log("error in authCheck", error);
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data });
            toast.success("Account created successfully")
             get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data });
            toast.success("Logged in successfully")
            
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async (data) => {
       
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null });
            toast.success("Logged out successfully")
             get().disconnectSocket()
        } catch (error) {
            toast.error("Error logging out");
            console.log("logOut error",error);
            
        }
    }
    ,
    updateProfile: async(data)=>{
         set({ isUpdateLoading: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser:res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Error in update profile");
            console.log(error.response?.data?.message || error.message);
        }
        finally{
            set({ isUpdateLoading: false })
        }
    }
    ,
    connectSocket:()=>{
        const {authUser}=get()

        if (!authUser || get().socket?.connected) return

        //BASE_URL in order to connect socket with backend we use this
        const socket =io(BASE_URL,{
            withCredentials:true,// this ensures cookies are sent with the connection
        })

        socket.connect()

        set({socket})

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        });

        
    },
    disconnectSocket :()=>{
        if(get().socket.connected) get().socket.disconnect()
    }
}));