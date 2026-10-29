import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dado from "@/components/Dado";

const MAXIMO_RODADAS = 5;

const COLORS = {
  background: "#e2d5c1",
  ink: "#8a6662",
  muted: "#71808a",
  coral: "#c98d7b",
  cream: "#e6d0b1",
  line: "#d9d2c5",
  card: "rgba(255, 250, 240, 0.62)",
};

export default function Jogo() {
  const router = useRouter();
  const [jogadorAtual, setJogadorAtual] = useState(1);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [dadosJogador1, setDadosJogador1] = useState([1, 1]);
  const [dadosJogador2, setDadosJogador2] = useState([1, 1]);
  const [resultado, setResultado] = useState("");

  const fimDeJogo = rodadaAtual > MAXIMO_RODADAS;
  const somaJogador1 = dadosJogador1[0] + dadosJogador1[1];
  const somaJogador2 = dadosJogador2[0] + dadosJogador2[1];

  function sortearDados() {
    return [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
  }

  function handleJogarDados1Click() {
    setDadosJogador1(sortearDados());
    setJogadorAtual(2);
  }

  function handleJogarDados2Click() {
    const novosDadosJogador2 = sortearDados();
    setDadosJogador2(novosDadosJogador2);

    const novaSomaJogador1 = dadosJogador1[0] + dadosJogador1[1];
    const novaSomaJogador2 = novosDadosJogador2[0] + novosDadosJogador2[1];

    if (novaSomaJogador1 > novaSomaJogador2) {
      setResultado("Jogador 1 venceu");
    } else if (novaSomaJogador2 > novaSomaJogador1) {
      setResultado("Jogador 2 venceu");
    } else {
      setResultado("Empate");
    }

    setJogadorAtual(1);
    setRodadaAtual(rodadaAtual + 1);
  }

  function handleJogarNovamenteClick() {
    setJogadorAtual(1);
    setRodadaAtual(1);
    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);
    setResultado("");
  }

  const jogadores = [
    {
      numero: 1,
      dados: dadosJogador1,
      soma: somaJogador1,
      disabled: fimDeJogo || jogadorAtual !== 1,
      onJogar: handleJogarDados1Click,
    },
    {
      numero: 2,
      dados: dadosJogador2,
      soma: somaJogador2,
      disabled: fimDeJogo || jogadorAtual !== 2,
      onJogar: handleJogarDados2Click,
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => pressed && styles.backPressed}
          >
            <Text style={styles.back}>‹ Voltar</Text>
          </Pressable>

          <View style={styles.headerRow}>
            <View style={styles.headerTitles}>
              <Text style={styles.eyebrow}>Duelo de sorte</Text>
              <Text style={styles.title}>Jogo do Dado</Text>
            </View>
            <Text style={styles.round}>
              {fimDeJogo ? "Fim de Jogo" : `Rodada Atual: ${rodadaAtual}`}
            </Text>
          </View>
        </View>

        <View style={styles.players} accessibilityLabel="Dados dos jogadores">
          {jogadores.map((jogador) => (
            <View
              key={jogador.numero}
              style={[
                styles.playerCard,
                !jogador.disabled && styles.activePlayer,
              ]}
            >
              <Text style={styles.playerTitle}>Jogador {jogador.numero}</Text>

              <View style={styles.diceRow}>
                <Dado valor={jogador.dados[0]} />
                <Dado valor={jogador.dados[1]} />
              </View>

              <View style={styles.total}>
                <Text style={styles.totalLabel}>Soma</Text>
                <Text style={styles.totalValue}>{jogador.soma}</Text>
              </View>

              <Pressable
                accessibilityRole="button"
                disabled={jogador.disabled}
                onPress={jogador.onJogar}
                style={({ pressed }) => [
                  styles.playButton,
                  jogador.disabled && styles.playButtonDisabled,
                  pressed && !jogador.disabled && styles.playButtonPressed,
                ]}
              >
                <Text style={styles.playButtonText}>Jogar dados</Text>
              </Pressable>
            </View>
          ))}
        </View>

        {resultado ? (
          <Text
            style={[styles.result, resultado === "Empate" && styles.resultDraw]}
          >
            {resultado}
          </Text>
        ) : null}

        {fimDeJogo ? (
          <Pressable
            accessibilityRole="button"
            onPress={handleJogarNovamenteClick}
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.resetButtonPressed,
            ]}
          >
            <Text style={styles.resetButtonText}>Jogar Novamente</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    paddingBottom: 23,
    gap: 10,
  },
  back: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  backPressed: {
    opacity: 0.6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerTitles: {
    flexShrink: 1,
    gap: 6,
  },
  eyebrow: {
    color: COLORS.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.9,
    textTransform: "uppercase",
  },
  title: {
    color: COLORS.ink,
    fontSize: 46,
    fontWeight: "800",
    letterSpacing: -2.8,
  },
  round: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "right",
    paddingTop: 6,
    maxWidth: 120,
  },
  players: {
    gap: 12,
    marginTop: 24,
  },
  playerCard: {
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.card,
    padding: 22,
  },
  activePlayer: {
    borderColor: COLORS.coral,
    shadowColor: "#172b3a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  playerTitle: {
    color: COLORS.ink,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  diceRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginVertical: 25,
  },
  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 14,
  },
  totalLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  totalValue: {
    color: COLORS.ink,
    fontSize: 26,
    fontWeight: "800",
  },
  playButton: {
    marginTop: 22,
    paddingVertical: 13,
    paddingHorizontal: 18,
    alignItems: "center",
    backgroundColor: COLORS.ink,
  },
  playButtonPressed: {
    backgroundColor: COLORS.coral,
  },
  playButtonDisabled: {
    opacity: 0.28,
  },
  playButtonText: {
    color: COLORS.cream,
    fontSize: 16,
    fontWeight: "800",
  },
  result: {
    marginTop: 27,
    marginBottom: 8,
    color: COLORS.coral,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.7,
  },
  resultDraw: {
    color: COLORS.ink,
  },
  resetButton: {
    alignSelf: "center",
    marginTop: 35,
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 27,
    alignItems: "center",
    backgroundColor: COLORS.coral,
  },
  resetButtonPressed: {
    backgroundColor: COLORS.ink,
  },
  resetButtonText: {
    color: COLORS.cream,
    fontSize: 16,
    fontWeight: "800",
  },
});
