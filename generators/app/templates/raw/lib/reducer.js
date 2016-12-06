import {SAMPLE} from './action';

const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE: {
      return state;
    }

    default: {
      return state;
    }

  }
};
