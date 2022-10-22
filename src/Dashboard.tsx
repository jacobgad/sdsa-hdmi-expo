import { Text, View } from "react-native";
import InputButton from "./components/InputButton";
import OffButton from "./components/OffButton";
import { stDemianaPorts, stJohnPorts } from "./utils/ports";

const stDemianaInputs = stDemianaPorts.filter(
  (port) => port.mode === "input" && port.name
);
const stJohnInputs = stJohnPorts.filter(
  (port) => port.mode === "input" && port.name
);

export default function Dashboard() {
  return (
    <View className="flex-1 items-center bg-slate-800 py-14 px-8">
      <Text className="text-3xl text-white">SDSA HDMI System</Text>

      <Text className="my-3 text-2xl text-white">Arabic Church</Text>
      <OffButton building="demiana" />
      <View className="flex flex-row flex-wrap">
        {stDemianaInputs.map((port) => (
          <InputButton key={port.number} building="demiana" port={port} />
        ))}
      </View>

      <Text className="mt-12 mb-3 text-2xl text-white">English Church</Text>
      <OffButton building="john" />
      <View className="flex flex-row flex-wrap">
        {stJohnInputs.map((port) => (
          <InputButton key={port.number} building="john" port={port} />
        ))}
      </View>
    </View>
  );
}
