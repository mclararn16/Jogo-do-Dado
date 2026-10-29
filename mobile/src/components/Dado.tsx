import { StyleSheet, View } from "react-native";

/** Posições dos pips em % da face do dado, iguais aos SVGs do site (dado-1..6.svg). */
const PIP_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [30, 30],
    [70, 70],
  ],
  3: [
    [30, 30],
    [50, 50],
    [70, 70],
  ],
  4: [
    [30, 30],
    [70, 30],
    [30, 70],
    [70, 70],
  ],
  5: [
    [30, 30],
    [70, 30],
    [50, 50],
    [30, 70],
    [70, 70],
  ],
  6: [
    [30, 27],
    [70, 27],
    [30, 50],
    [70, 50],
    [30, 73],
    [70, 73],
  ],
};

type DadoProps = {
  valor: number;
  size?: number;
};

export default function Dado({ valor, size = 80 }: DadoProps) {
  const valorValido = Math.min(6, Math.max(1, Number(valor) || 1));
  const borda = Math.round(size * 0.06);
  const pip = Math.round(size * 0.185);
  const pips = PIP_POSITIONS[valorValido];

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Dado mostrando ${valorValido}`}
      style={[
        styles.face,
        {
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.185),
          borderWidth: borda,
        },
      ]}
    >
      {pips.map(([x, y]) => (
        <View
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            // coordenadas no espaço da face inteira (como no SVG), compensando a borda
            left: (x / 100) * size - pip / 2 - borda,
            top: (y / 100) * size - pip / 2 - borda,
            width: pip,
            height: pip,
            borderRadius: pip / 2,
            backgroundColor: "#e85d3f",
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  face: {
    backgroundColor: "#fffaf0",
    borderColor: "#172b3a",
  },
});
