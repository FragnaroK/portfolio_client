import { useCallback, useEffect, useMemo } from "react";
import { get, child } from "firebase/database";
import Const from "@/constants";
import { dbRef } from "@/config/firebase.config";
import Logger from "node-logger-web";
import useFirebaseStore from "@/stores/firebase";
import { DatabaseSnap } from "@/types/database.types";

type FirebaseHook = (options?: { enableFetch: boolean }) => {
	database: {
		ref?: typeof dbRef;
		snap?: DatabaseSnap;
		iteration?: string;
	};
};

const useFirebase: FirebaseHook = (options) => {
	const log = new Logger("Firebase::hook", import.meta.env.DEV);
	const { ref, snap, iteration, updateDatabase, incrementIteration } = useFirebaseStore();

	const fetchData = useCallback(async () => {
		try {
			const snapshot = await get(dbRef);
			if (!snapshot.exists()) {
				log.d("No data found in database.");
				return;
			}

			log.d("Incoming change -> ", snapshot.val());
			updateDatabase(snapshot.val());
		} catch (err) {
			log.d("Error getting db -> ", err);
		}
	}, [dbRef]);

	const fetchIteration = useCallback(async () => {
		try {
			const snapshot = await get(child(dbRef, Const.Database.Path.Iteration));
			const newIteration = `${snapshot.val()}`;

			if (iteration && newIteration === iteration) return;

			log.d(`Getting new data iteration from db (i${iteration} -> i${newIteration})`);
			incrementIteration(newIteration);
		} catch (err) {
			log.d("Error getting db iteration -> ", err);
		}
	}, [iteration]);

	useEffect(() => {
		if (!dbRef) return;
		if (!options?.enableFetch) return;

		const prevIteration = snap?.meta?.db_iteration;
		if (snap && iteration && prevIteration === iteration) return;

		log.d("Getting data from database.");

		fetchData();
	}, [iteration, snap, dbRef, options]);

	useEffect(() => {
		if (!dbRef) return;
		if (!options?.enableFetch) return;

		fetchIteration();
	}, [dbRef, options]);

	const database = useMemo(
		() => ({
			ref,
			snap,
			iteration,
		}),
		[ref, snap, iteration],
	);

	return { database };
};

export default useFirebase;
