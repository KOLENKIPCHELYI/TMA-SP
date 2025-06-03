import { create } from 'zustand';

const useTasksStore = create((set) => ({
  tasks: [],
  currentGroup: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  setCurrentGroup: (group) => set({ currentGroup: group }),
}));

export default useTasksStore;
