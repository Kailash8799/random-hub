import type { RootState } from "@/redux/store";
import { increment } from "@/redux/features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Pricing = () => {
  const count = useAppSelector((state: RootState) => state.loginstate.value);
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        dispatch(increment());
      }}
    >
      {count}
    </div>
  );
};

export default Pricing;
