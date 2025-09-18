import { create } from "zustand";

interface StreamControlsState {
  showRecord: boolean;
  showCallStats: boolean;
  showScreenShare: boolean;
  showEndCallForAll: boolean;
  showChat: boolean;
  toggleRecord: () => void;
  toggleCallStats: () => void;
  toggleScreenShare: () => void;
  toggleEndCallForAll: () => void;
  toggleChat: () => void;
}

export const useStreamControls = create<StreamControlsState>((set) => ({
  showRecord: true,
  showCallStats: true,
  showScreenShare: true,
  showEndCallForAll: true,
  showChat: false,
  toggleRecord: () => set((state) => ({ showRecord: !state.showRecord })),
  toggleCallStats: () =>
    set((state) => ({ showCallStats: !state.showCallStats })),
  toggleScreenShare: () =>
    set((state) => ({ showScreenShare: !state.showScreenShare })),
  toggleEndCallForAll: () =>
    set((state) => ({ showEndCallForAll: !state.showEndCallForAll })),
  toggleChat: () => set((state) => ({ showChat: !state.showChat })),
}));
