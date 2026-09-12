import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.homeContent}>
        <p className={styles.homeEyebrow}>Duelo em cinco rodadas</p>
        <h1>Jogo do Dado</h1>
        <p className={styles.homeDescription}>
        Um duelo de dados em cinco rodadas! Cada jogador rola o dado por vez,
        e quem tirar o maior número na rodada ganha um ponto. Ao final das
        cinco rodadas, quem tiver mais pontos vence o duelo.
        </p>
        <Link className={styles.homeButton} href="/game">
          Jogar agora
        </Link>
      </div>
    </main>
  );
}