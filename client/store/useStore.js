import { create } from "zustand";
import initialState from "../constants/initialState";

export const useStore = create((set) => ({
  // 🔹 STATE
  news: initialState.news,
  members: initialState.members,

  // 🔹 NEWS
  addNews: (item) =>
    set((state) => ({
      news: [item, ...state.news],
    })),

  removeNews: (id) =>
    set((state) => ({
      news: state.news.filter((n) => n.id !== id),
    })),

  // 🔹 MEMBERS
  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),

  updateMember: (id, updatedData) =>
    set((state) => ({
      members: state.members.map((m) =>
        m.id === id ? { ...m, ...updatedData } : m
      ),
    })),

  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    })),
}));