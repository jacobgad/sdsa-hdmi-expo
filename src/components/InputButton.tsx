import { Pressable, Text } from "react-native";
import { Building, getBuildingUrl, setAllToInput } from "../utils/adapter";
import { Port } from "../utils/ports";
import { Buffer } from "buffer";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-root-toast";

interface Props {
  port: Port;
  building: Building;
}

function setInput(building: Building, portNumber: Port["number"]) {
  return fetch(getBuildingUrl(building), {
    method: "POST",
    body: setAllToInput(portNumber, building),
    mode: "no-cors",
    credentials: "include",
    headers: {
      Authorization: "Basic " + Buffer.from("admin:admin").toString("base64"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
    },
  });
}

export default function InputButton({ building, port }: Props) {
  const { mutate, isLoading } = useMutation(
    () => setInput(building, port.number),
    {
      onSuccess: () => Toast.show("Updated"),
      onError: () => Toast.show("Error switching input"),
    }
  );

  return (
    <Pressable
      onPress={() => mutate()}
      disabled={isLoading}
      className="flex aspect-video h-full w-1/3 justify-center rounded-lg border-4 border-transparent bg-blue-600 active:scale-95 active:bg-blue-800"
    >
      <Text className="text-center text-white">{port.name}</Text>
    </Pressable>
  );
}
