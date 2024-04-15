import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

import { GlobalState } from "../redux/store";

const useCustomSelector: TypedUseSelectorHook<GlobalState> = useReduxSelector;

export default useCustomSelector;
