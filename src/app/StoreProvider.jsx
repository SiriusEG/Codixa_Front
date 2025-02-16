"use client";

import React from "react";
import { Provider } from "react-redux" ;
import { useStore } from "../../lib/store";
import AuthCheckCS from "./(Allpages)/(pages1)/components/AuthCheckCS";

const StoreProvider = ({ children }) => {
  const store = useStore({});

  return (
    <Provider store={store}>
      <AuthCheckCS />
      {children}
    </Provider>
  );
};

export default StoreProvider;
