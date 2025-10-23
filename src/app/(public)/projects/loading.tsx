import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-4 lg:py-52 py-44">
      <Loader className="h-8 w-8 animate-spin text-white" />
      <span className="text-xl font-medium text-white">Loading...</span>
    </div>
  );
};

export default Loading;