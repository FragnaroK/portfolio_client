import { dbRef } from "@/config/firebase.config";
import { DatabaseStructure } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FirebaseState {
	ref: typeof dbRef;
	snap: DatabaseStructure.DatabaseSnap | undefined;
	iteration: string | undefined;

	// Actions
	updateDatabase: (data: DatabaseStructure.DatabaseSnap) => void;
	incrementIteration: (iteration: string) => void;
	updateRef: (ref: typeof dbRef) => void;
}

const useFirebaseStore = create<FirebaseState>()(
	persist(
		(set) => ({
			ref: dbRef,
			snap: undefined,
			iteration: undefined,

			updateDatabase: (data) => set({ snap: data }),
			incrementIteration: (iteration) => set({ iteration }),
			updateRef: (ref) => set({ ref }),
		}),
		{
			name: "firebase-storage",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				snap: state.snap,
				iteration: state.iteration,
			}),
		},
	),
);

export default useFirebaseStore;
