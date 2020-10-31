import {
  CHANGE_SCROLL} from './constants';
const initialStateScroll = {
  isScrolled: false
}

export const scrollApp = (state=initialStateScroll, action={}) => {
  switch (action.type) {
    case CHANGE_SCROLL:
      return {...state,...{isScrolled: action.payload}}
    default:
      return state
  }
}
