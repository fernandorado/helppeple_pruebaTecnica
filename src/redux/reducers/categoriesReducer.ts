import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Category, CategoryState, NewCategory } from "../../types/Category";
import { Product } from "../../types/Product";
import { uploadFile } from "./productReducer";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: "",
  categoryProducts: [],
};

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const fetchAllCategories = createAsyncThunk("categories", async () => {
  try {
    const response = await axios.get<Category[]>(`${BASE_URL}/categories`);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      return JSON.stringify(error.response.data);
    }
    return error.message;
  }
});

export const fetchProductByCategory = createAsyncThunk(
  "category/products",
  async (categoryId: number) => {
    try {
      const response = await axios.get<Product[]>(
        `${BASE_URL}/categories/${categoryId}/products`
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        return JSON.stringify(error.response.data);
      }
      return error.message;
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "createCategory",
  async ({ file, category }: { file: File | null; category: NewCategory }) => {
    let imageUrl = "";
    if (file) {
      imageUrl = await uploadFile(file);
    }
    const categoryData: NewCategory = {
      ...category,
      image: file ? `${imageUrl}` : "",
    };
    try {
      const response = await axios.post<Category>(
        `${BASE_URL}/categories/`,
        categoryData
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        return JSON.stringify(error.response.data);
      }
      return error.message;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (categoryId: number) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/categories/${categoryId}`
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        return JSON.stringify(error.response.data);
      }
      return error.message;
    }
  }
);

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    /*cleanUpCartReducer: (state) => {
      return {
        ...state,
        categories: [], // Limpiar las categorías
        categoryProducts: [], // Limpiar los productos de categoría
        loading: false, // Resetear el indicador de carga
        error: "", // Limpiar el mensaje de error
      };
      
    },*/
    /*cleanUpCartReducer: (state) => {
      return initialState;
    },*/
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.categories = action.payload;
        }
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.categoryProducts = action.payload;
        }
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.toString() || "unknown error";
      })
      .addCase(addNewCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload == "string") {
          state.error = action.payload;
        } else {
          state.categories.push(action.payload);
        }
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          const categoryId = action.meta.arg;
          state.categories = state.categories.filter(
            (category) => category.id !== categoryId
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const categoriesReducer = categoriesSlice.reducer;
//const { cleanUpCartReducer } = categoriesSlice.actions;
export default categoriesReducer;
