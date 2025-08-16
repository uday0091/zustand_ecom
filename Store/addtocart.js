import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: async (pro) => {
    try {
      const userdetails = localStorage.getItem("user");
      if (!userdetails) return console.log("User not found");

      const userid = JSON.parse(userdetails).user._id;

      const res = await fetch("http://localhost:3400/cartitem", {
        method: "POST",
        body: JSON.stringify({ pro, userid }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Cart Response :", data);

      // Optionally update local cart state
      if (data.success && data.item) {
        const existing = get().cartItems.find((ci) => ci.item === id);
        if (existing) {
          set((state) => ({
            cartItems: state.cartItems.map((ci) =>
              ci.item === id ? { ...ci, quantity: ci.quantity + 1 } : ci
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, data.item],
          }));
        }
      }

    } catch (error) {
      console.error("Error adding to cart", error);
    }
  },
  
  // removeFromCart: async (id) => {
  // try {
  //   const userdetails = localStorage.getItem("user");
  //     if (!userdetails) return console.log("User not found");
  
  //     const userid = JSON.parse(userdetails).user._id;
  
  //     const res = await fetch(`http://localhost:3400/cartitem/remove`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userid, id }),
  //     });
  
  //     const data = await res.json();
  //     console.log("Remove Response:", data);
  
  //     if (data.success) {
  //       if (data.message === "Quantity decreased") {
  //         // reduce quantity by 1
  //         set((state) => ({
  //           cartItems: state.cartItems.map((ci) =>
  //             ci.item === id ? { ...ci, quantity: ci.quantity - 1 } : ci
  //           ),
  //         }));
  //       } else if (data.message === "Item removed from cart") {
  //         // remove completely
  //         set((state) => ({
  //           cartItems: state.cartItems.filter((ci) => ci.item !== id),
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error removing from cart", error);
  //   }
  // },
  








}));

export default useCartStore;