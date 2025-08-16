import {create} from 'zustand'


let authuser =  create((set)=>({

     user : null,
     auth : async ()=>{
        try {
            let data = await fetch("http://localhost:3400/auth",{
                credentials: 'include',
            })
            let res = await data.json()
            console.log(res ,"ddddd")
            set({user:res})
        } catch (error) {
            
        }
    },
    logout: async () => {
        try {
          await fetch("http://localhost:3400/logout", {
            credentials: "include",
          });
          set({ user: null });
          localStorage.removeItem("user")
          
        } catch (error) {
          console.log("Logout failed");
        }
      },

      update: false, // initial state
      setUpdateTrue: () => set({ update: true }),
      setUpdateFalse: () => set({ update: false }),
}))

export default authuser;