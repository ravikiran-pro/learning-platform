import dynamic from "next/dynamic";

//legacy safe for ssr issue on tiptapeditor
const ProblemViewWrapper = dynamic(() => import("./ProblemView"), {
  ssr: false,
});

export default ProblemViewWrapper;
