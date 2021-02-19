import {
  SET_HEADT_TITLE
} from '../action_Type';

const initHead = "首页"
export default function (state = initHead, action) {
  const {
    type,
    data
  } = action;
  switch (type) {
    case SET_HEADT_TITLE:
      return data;
    default:
      return state;
  }
}