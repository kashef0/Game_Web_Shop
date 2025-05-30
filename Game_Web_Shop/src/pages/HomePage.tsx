import App from "@/App";
import { setLoading } from "@/store/Slices/messageSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const { messages, loading: messageLoaoding } = useSelector(
    (state: RootState) => state.message
  );

  useEffect(() => {
    if (!messageLoaoding && messages.length === 0) dispatch(setLoading(true));
  }, [messages.length, messageLoaoding, dispatch]);
  return (
    <>
      <App />
    </>
  );
};

export default HomePage;
