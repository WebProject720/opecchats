import { proxy, subscribe } from "valtio";

type Store = {
  loggedUser?: Object;
  isActive: Boolean;
  isGuest:Boolean;
  Chats?:Array<Object>;
};

const collection: Store = {
  loggedUser: {},
  isActive: false,
  isGuest:false
};

const initValue =
  typeof window !== "undefined" && localStorage.getItem("store")
    ? JSON.parse(localStorage.getItem("store") as string)
    : collection;

const state = proxy(initValue);

// Subscribe and update localStorage only on the client side
if (typeof window !== "undefined") {
  subscribe(state, () => {
    localStorage.setItem("store", JSON.stringify(state));
  });
}

export { state };
