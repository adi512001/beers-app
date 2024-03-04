import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TBeer } from "../types";

interface BeersState {
  beers: TBeer[];
  favoriteBeers: TBeer[];
}

const initialState: BeersState = {
  beers: [],
  favoriteBeers: [],
};

export const beersSlice = createSlice({
  name: "beers",
  initialState,
  reducers: {
    setBeers: (state, action: PayloadAction<TBeer[]>) => {
      state.beers = [...action.payload];
    },
    setFavoriteBeers: (
      state,
      action: PayloadAction<{ beer: TBeer; favoriteValue: boolean }>
    ) => {
      const { beer, favoriteValue } = action.payload;
      if (favoriteValue) {
        state.favoriteBeers = [
          ...state.favoriteBeers,
          { ...beer, isFavorite: favoriteValue },
        ];
      } else {
        const index = state.favoriteBeers.findIndex((b) => b.id === beer.id);
        if (index > -1) {
          state.favoriteBeers.splice(index, 1);
        }
      }
    },
    removeAllFavoriteBeers: (state) => {
      state.favoriteBeers = [];
    },
    setBeerRank: (
      state,
      action: PayloadAction<{ beerId: number; rank: number }>
    ) => {
      const { beerId, rank } = action.payload;
      const updatedFavoriteBeers = [...state.favoriteBeers];
      const beerIndex = state.favoriteBeers.findIndex((b) => b.id === beerId);
      updatedFavoriteBeers[beerIndex] = {
        ...updatedFavoriteBeers[beerIndex],
        rank,
      };
      state.favoriteBeers = updatedFavoriteBeers;
    },
  },
});

export const {
  setBeers,
  setFavoriteBeers,
  removeAllFavoriteBeers,
  setBeerRank,
} = beersSlice.actions;

export const selectBeers = (state: RootState) => state;

export default beersSlice.reducer;
