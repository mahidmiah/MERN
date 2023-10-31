import { create } from 'zustand';

const useWorkoutStore = create((set) => ({
  workouts: {}, // Initialize workouts as an empty object
  addWorkout: (newWorkout) => set((state) => ({ workouts: { ...state.workouts, [newWorkout._id]: newWorkout } })),
  getSortedWorkouts: () => {
    // Convert the workouts object into an array
    const workoutsArray = Object.values(useWorkoutStore.getState().workouts);
    // Sort the array based on the createdAt property in descending order
    const sortedWorkouts = workoutsArray.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedWorkouts;
  },
  deleteWorkout: (id) => {
    set((state) => {
      const {[id]: deleted, ...remainingWorkouts} = state.workouts; 
      return {workouts: remainingWorkouts};
    })
  }
}));

export default useWorkoutStore;
