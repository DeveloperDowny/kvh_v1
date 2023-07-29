import React from "react";
// import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store.js";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

// ReactDOM.render(
//   <ChakraProvider>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </ChakraProvider>,
//   document.getElementById("root")
// );

import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
