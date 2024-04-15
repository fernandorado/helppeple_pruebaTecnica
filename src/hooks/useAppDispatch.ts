import { useDispatch as useReduxDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const useAppDispatch: () => AppDispatch = useReduxDispatch;

export default useAppDispatch;
