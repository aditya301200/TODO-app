import { useContext } from "react";
import { createContext } from "react";

export const TODOContext = createContext({
  todos: [{ id: 1, todo: "Learn React", completed: false }],
  addTODO: (todo) => {},
  updateTODO: (id, todo) => {},
  deleteTODO: (id) => {},
  toggleComplete: (id) => {},
});

export const useTODO = () => {
  return useContext(TODOContext);
};

export const TODOprovider = TODOContext.Provider;
