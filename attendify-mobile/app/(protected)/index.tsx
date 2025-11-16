import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const randomId = Math.floor(Math.random() * 10) + 1;
  return (
    <View>
      <Text>Home screen</Text>
      <Pressable onPress={() => router.navigate(`/${randomId}`)}>
        <Text>ID</Text>
      </Pressable>
    </View>
  );
}
