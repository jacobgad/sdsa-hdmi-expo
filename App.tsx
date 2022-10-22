import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Dashboard from "./src/Dashboard";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RootSiblingParent>
        <Dashboard />
        <StatusBar style="auto" />
      </RootSiblingParent>
    </QueryClientProvider>
  );
}
