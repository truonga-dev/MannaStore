import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // unique string for the cart item (e.g. productId + variantId)
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  size?: string | null;
  color?: string | null;
  maxStock?: number | null;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const id = `${item.productId}-${item.variantId}`;
        set((state) => {
          const existingItem = state.items.find((i) => i.id === id);
          if (existingItem) {
            const newQty = existingItem.quantity + item.quantity;
            const clampedQty = typeof item.maxStock === 'number' && item.maxStock > 0 
              ? Math.min(newQty, item.maxStock) 
              : newQty;
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: clampedQty, maxStock: item.maxStock ?? i.maxStock } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, id }] };
        });
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id !== id) return i;
            let targetQty = Math.max(1, quantity);
            if (typeof i.maxStock === 'number' && i.maxStock > 0 && targetQty > i.maxStock) {
              targetQty = i.maxStock;
            }
            return { ...i, quantity: targetQty };
          }),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'manna-cart-storage', // key in local storage
    }
  )
);
