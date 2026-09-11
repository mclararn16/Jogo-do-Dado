"use client";

import { useState } from "react";
import Dado from "./Dado";
import styles from "../page.module.css";

const TOTAL_RODADAS = 5;
const VALOR_INICIAL = [1, 1];

function sortearDados() {
  return [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
}

function compararRodada(dadosJogador1, dadosJogador2) {
  const somaJogador1 = dadosJogador1[0] + dadosJogador1[1];
  const somaJogador2 = dadosJogador2[0] + dadosJogador2[1];

  if (somaJogador1 > somaJogador2) return "Jogador 1 venceu";
  if (somaJogador2 > somaJogador1) return "Jogador 2 venceu";
  return "Empate";
}

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dados, setDados] = useState({ jogador1: VALOR_INICIAL, jogador2: VALOR_INICIAL });
  const [jogadorDaVez, setJogadorDaVez] = useState(1);
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [partidaEncerrada, setPartidaEncerrada] = useState(false);

  const jogar = (jogador) => {
    if (partidaEncerrada || jogador !== jogadorDaVez) return;

    const novosDados = sortearDados();
    const dadosAtualizados = {
      ...dados,
      [jogador === 1 ? "jogador1" : "jogador2"]: novosDados,
    };
    setDados(dadosAtualizados);

    if (jogador === 1) {
      setJogadorDaVez(2);
      return;
    }

    const resultadoDaRodada = compararRodada(
      dadosAtualizados.jogador1,
      dadosAtualizados.jogador2,
    );
    const novoHistorico = [...historico, resultadoDaRodada];
    setResultado(resultadoDaRodada);
    setHistorico(novoHistorico);

    if (rodada === TOTAL_RODADAS) {
      setPartidaEncerrada(true);
      return;
    }

    setRodada((rodadaAtual) => rodadaAtual + 1);
    setJogadorDaVez(1);
  };

  const jogarNovamente = () => {
    setRodada(1);
    setDados({ jogador1: VALOR_INICIAL, jogador2: VALOR_INICIAL });
    setJogadorDaVez(1);
    setResultado(null);
    setHistorico([]);
    setPartidaEncerrada(false);
  };

  const vitoriasJogador1 = historico.filter((item) => item === "Jogador 1 venceu").length;
  const vitoriasJogador2 = historico.filter((item) => item === "Jogador 2 venceu").length;
  const vencedorDaPartida =
    vitoriasJogador1 > vitoriasJogador2
      ? "Jogador 1 venceu a partida"
      : vitoriasJogador2 > vitoriasJogador1
        ? "Jogador 2 venceu a partida"
        : "Empate geral";

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Duelo de sorte</p>
          <h1>Jogo do Dado</h1>
        </div>
        <div className={styles.roundBadge}>
          <span>Rodada</span>
          <strong>{rodada} <small>/ {TOTAL_RODADAS}</small></strong>
        </div>
      </header>

      <section className={styles.scoreboard} aria-label="Placar da partida">
        <div><span>Jogador 1</span><strong>{vitoriasJogador1}</strong></div>
        <div className={styles.scoreDivider}>x</div>
        <div><span>Jogador 2</span><strong>{vitoriasJogador2}</strong></div>
      </section>

      <section className={styles.players} aria-label="Dados dos jogadores">
        <PlayerCard
          jogador={1}
          dados={dados.jogador1}
          vez={jogadorDaVez === 1 && !partidaEncerrada}
          onJogar={() => jogar(1)}
        />
        <PlayerCard
          jogador={2}
          dados={dados.jogador2}
          vez={jogadorDaVez === 2 && !partidaEncerrada}
          onJogar={() => jogar(2)}
        />
      </section>

      {resultado && (
        <p className={`${styles.result} ${resultado === "Empate" ? styles.draw : ""}`}>
          {partidaEncerrada ? vencedorDaPartida : resultado}
        </p>
      )}

      {partidaEncerrada ? (
        <button className={styles.resetButton} onClick={jogarNovamente} type="button">
          Jogar Novamente
        </button>
      ) : (
        <p className={styles.turnHint}>Vez do Jogador {jogadorDaVez}</p>
      )}

      <div className={styles.history} aria-label="Resultado das rodadas">
        {historico.map((item, index) => (
          <span key={`${item}-${index}`} className={item === "Empate" ? styles.historyDraw : ""}>
            R{index + 1}: {item.replace("Jogador ", "J")}
          </span>
        ))}
      </div>
    </main>
  );
}

function PlayerCard({ jogador, dados, vez, onJogar }) {
  const soma = dados[0] + dados[1];

  return (
    <article className={`${styles.playerCard} ${vez ? styles.activePlayer : ""}`}>
      <div className={styles.playerHeading}>
        <span className={styles.playerNumber}>0{jogador}</span>
        <div>
          <h2>Jogador {jogador}</h2>
          <p>{vez ? "Sua vez de jogar" : "Aguardando"}</p>
        </div>
      </div>
      <div className={styles.diceRow}>
        {dados.map((valor, index) => <Dado key={`${jogador}-${index}`} valor={valor} />)}
      </div>
      <div className={styles.total}>Soma <strong>{soma}</strong></div>
      <button className={styles.playButton} disabled={!vez} onClick={onJogar} type="button">
        Jogar dados
      </button>
    </article>
  );
}
