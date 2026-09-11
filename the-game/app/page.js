import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <h1>Jogo do Dado</h1>
      <p>
        Um duelo de dados em cinco rodadas! Cada jogador rola o dado por vez,
        e quem tirar o maior número na rodada ganha um ponto. Ao final das
        cinco rodadas, quem tiver mais pontos vence o duelo.
      </p>
      <Link href="/game">
        <button style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
          Jogar agora
        </button>
      </Link>
    </div>
  );
}