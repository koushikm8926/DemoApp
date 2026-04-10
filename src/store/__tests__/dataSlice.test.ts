import reducer, {resetData, setRefreshing} from '../dataSlice';

describe('dataSlice', () => {
  const initialState = {
    items: [],
    isLoading: false,
    isRefreshing: false,
    error: null,
    total: 0,
    skip: 0,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle resetData', () => {
    const previousState = {
      ...initialState,
      items: [{id: 1}],
      skip: 10,
      total: 100,
    };
    expect(reducer(previousState, resetData())).toEqual(initialState);
  });

  it('should handle setRefreshing', () => {
    expect(reducer(initialState, setRefreshing(true))).toEqual({
      ...initialState,
      isRefreshing: true,
    });
  });
});
