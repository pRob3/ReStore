export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 69,
  title: 'yet(!) another counter...',
};

export default function counterReducer(state = initialState, action: any) {
  return state;
}
