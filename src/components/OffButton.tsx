import { useMutation } from "@tanstack/react-query";
import { Pressable, Text } from "react-native";
import Toast from "react-native-root-toast";
import { Building, getBuildingUrl, setAllPortsOff } from "../utils/adapter";
import { Buffer } from "buffer";

interface Props {
  building: Building;
}

function turnOff(building: Building) {
  return fetch(getBuildingUrl(building), {
    method: "POST",
    body: setAllPortsOff(building),
    mode: "no-cors",
    credentials: "include",
    headers: {
      Authorization: "Basic " + Buffer.from("admin:admin").toString("base64"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
    },
  });
}

export default function OffButton({ building }: Props) {
  const { mutate, isLoading } = useMutation(() => turnOff(building), {
    onSuccess: () => Toast.show("TVs turned off"),
    onError: () => Toast.show("Error turning off"),
  });

  return (
    <Pressable
      onPress={() => mutate()}
      disabled={isLoading}
      className="w-full rounded-lg border-4 border-transparent bg-red-500 p-2 active:scale-95 active:bg-red-700 disabled:bg-gray-600"
    >
      <Text className="text-center text-white">Off</Text>
    </Pressable>
  );
}
