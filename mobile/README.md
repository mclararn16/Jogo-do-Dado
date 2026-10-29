# Jogo do Dado — mobile (Expo)

Versão mobile do **Jogo do Dado** (duelo de dados em cinco rodadas), migrada do
projeto web publicado no Vercel (`vercelDados/Jogo-do-Dado`) para Expo Go com
[Expo Router](https://docs.expo.dev/router/introduction/).

## Estrutura

- `src/app/_layout.tsx` — layout raiz (Stack, sem header nativo)
- `src/app/index.tsx` — tela inicial (apresentação + "Jogar agora")
- `src/app/game/index.tsx` — tela do jogo (2 jogadores, 5 rodadas)
- `src/components/Dado.tsx` — dado renderizado com views (mesmo visual dos SVGs do site)

## Rodar

```bash
npm install
npx expo start
```

Escaneie o QR code com o **Expo Go** (Android) ou use o simulador (`a` / `i`).

## Verificar

```bash
npx tsc --noEmit   # typecheck
npx expo lint      # lint
npx expo-doctor    # saúde do projeto
```
