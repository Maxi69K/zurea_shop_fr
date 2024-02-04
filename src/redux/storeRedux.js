import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./user.slicer";
import loaderSlicer from "./loader.slicer";
import modalSlicer from "./modal.slicer";

const storeRedux = configureStore({
  reducer: {
    userStore: userSlicer,
    loaderStore: loaderSlicer,
    modalStore: modalSlicer
  }
});

export default storeRedux;