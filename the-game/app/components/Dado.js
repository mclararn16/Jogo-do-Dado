export default function Dado({ valor }) {
  const valorValido = Math.min(6, Math.max(1, Number(valor) || 1));

  return (
    <img
      src={`/dados/dado-${valorValido}.svg`}
      alt={`Dado mostrando ${valorValido}`}
      width={92}
      height={92}
    />
  );
}