import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.home} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Duelo em cinco rodadas</Text>
        <Text style={styles.title}>Jogo do Dado</Text>
        <Text style={styles.description}>
          Um duelo de dados em cinco rodadas! Cada jogador rola o dado por vez,
          e quem tirar o maior número na rodada ganha um ponto. Ao final das
          cinco rodadas, quem tiver mais pontos vence o duelo.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/game")}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Jogar agora</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#e2d5c1",
  },
  content: {
    width: "100%",
    maxWidth: 640,
    alignItems: "center",
    gap: 18,
  },
  eyebrow: {
    color: "#c98d7b",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.9,
    textTransform: "uppercase",
    textAlign: "center",
  },
  title: {
    color: "#8a6662",
    fontSize: 46,
    fontWeight: "800",
    letterSpacing: -2.8,
    textAlign: "center",
  },
  description: {
    color: "#8a6662",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 4,
    backgroundColor: "#8a6662",
  },
  buttonPressed: {
    backgroundColor: "#c98d7b",
  },
  buttonText: {
    color: "#e6d0b1",
    fontSize: 16,
    fontWeight: "800",
  },
});
