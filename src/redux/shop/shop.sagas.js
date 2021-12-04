import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess
} from "../shop/shop.actions";
import { collection, getDocs } from "firebase/firestore";
import {
  convertCollectionSnapshotToMap,
  db
} from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const snapshot = yield getDocs(collection(db, "collections"));
    console.log(snapshot);
    const collections = [];
    snapshot.forEach((doc) => collections.push({ ...doc.data(), id: doc.id }));
    const collectionsMap = yield call(
      convertCollectionSnapshotToMap,
      collections
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* onFetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(onFetchCollectionsStart)]);
}
