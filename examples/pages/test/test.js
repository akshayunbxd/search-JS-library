import dynamic from "next/dynamic";
const TestComp = dynamic(
    () => {
      return import("../../components/TestComp");
    },
    { ssr: false }
  );
function Test({ Component, pageProps }) {
  return <div>
      <TestComp />
    </div>
}

export default Test
