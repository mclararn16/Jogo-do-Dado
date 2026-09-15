"use client";

import { useState } from "react";
import Dado from "./Dado";
import styles from "./JogoDados.module.css";

const MAXIMO_RODADAS = 5;

export default function JogoDados() {
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

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Duelo de sorte</p>
        <h1>Jogo do Dado</h1>
        <p>{fimDeJogo ? "Fim de Jogo" : `Rodada Atual: ${rodadaAtual}`}</p>
      </header>

      <section className={styles.players} aria-label="Dados dos jogadores">
        <article className={styles.playerCard}>
          <h2>Jogador 1</h2>
          <div className={styles.diceRow}>
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>
          <div className={styles.total}>Soma <strong>{somaJogador1}</strong></div>
          <button
            className={styles.playButton}
            disabled={fimDeJogo || jogadorAtual !== 1}
            onClick={handleJogarDados1Click}
            type="button"
          >
            Jogar dados
          </button>
        </article>

        <article className={styles.playerCard}>
          <h2>Jogador 2</h2>
          <div className={styles.diceRow}>
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <div className={styles.total}>Soma <strong>{somaJogador2}</strong></div>
          <button
            className={styles.playButton}
            disabled={fimDeJogo || jogadorAtual !== 2}
            onClick={handleJogarDados2Click}
            type="button"
          >
            Jogar dados
          </button>
        </article>
      </section>

      {resultado && (
        <p className={`${styles.result} ${resultado === "Empate" ? styles.draw : ""}`}>
          {resultado}
        </p>
      )}

      {fimDeJogo && (
        <button className={styles.resetButton} onClick={handleJogarNovamenteClick} type="button">
          Jogar Novamente
        </button>
      )}
    </main>
  );
}