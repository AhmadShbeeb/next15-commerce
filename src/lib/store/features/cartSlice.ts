import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  image: string;
  color?: { id: string; name: string };
  size?: { id: string; name: string };
  availableColors?: { id: string; name: string }[];
  availableSizes?: { id: string; name: string }[];
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item: CartItem) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
    },
    removeItem: (state: CartState, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: CartItem) => item.productId !== action.payload);
      state.total = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
    },
    updateQuantity: (state: CartState, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((item: CartItem) => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.total = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
    },
    updateItemOptions: (
      state: CartState,
      action: PayloadAction<{
        productId: string;
        color?: { id: string; name: string };
        size?: { id: string; name: string };
      }>,
    ) => {
      const item = state.items.find((item) => item.productId === action.payload.productId);
      if (item) {
        if (action.payload.color) item.color = action.payload.color;
        if (action.payload.size) item.size = action.payload.size;
      }
    },
    clearCart: (state: CartState) => {
      state.items = initialState.items;
      state.total = initialState.total;
    },
  },
});

export const { addItem, removeItem, updateQuantity, updateItemOptions, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
