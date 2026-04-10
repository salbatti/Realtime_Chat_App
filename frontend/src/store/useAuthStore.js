import {create} from 'zustand';

export const useAuthStore =create((set,get)=>({
    authUser :{name:"Steve George",_id:124,age:25},
    isLoading:false,

    login:() =>{
       set({isLoading:true})
    }
}));