import { GET_ERROR } from "../Actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      return action.payload;
    default:
      return state;
  }
}
