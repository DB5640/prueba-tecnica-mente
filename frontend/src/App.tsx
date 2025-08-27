import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
// import TableExample from "./TableExample";
import { TabsApp } from "./TabsApp";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="flex flex-col w-screen h-screen items-center p-4">
        <TabsApp />
      </div>
    </QueryClientProvider>
  );
}

export default App;
