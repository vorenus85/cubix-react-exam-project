import { Bars } from "react-loader-spinner";

export default function Loader() {
  return (
    <Bars
      height="200"
      width="200"
      color="#1976d2"
      radius="0"
      ariaLabel="bars-loading"
      wrapperStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      wrapperClass=""
      visible={true}
    />
  );
}
