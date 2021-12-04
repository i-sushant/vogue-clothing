import ShopActionTypes from "./shop.types";
import { collection, getDocs } from "firebase/firestore";
import {
  convertCollectionSnapshotToMap,
  db
} from "../../firebase/firebase.utils";
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});
export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  errorMessage: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCollectionsStart());
      const snapshot = await getDocs(collection(db, "collections"));
      const collections = [];
      snapshot.forEach((doc) =>
        collections.push({ ...doc.data(), id: doc.id })
      );
      const collectionsMap = convertCollectionSnapshotToMap(collections);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
      dispatch(fetchCollectionsFailure(error.message));
    }
  };
};
