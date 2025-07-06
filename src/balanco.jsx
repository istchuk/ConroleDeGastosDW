import { useState, useEffect } from "react";
import { totalfixas } from "./fixas";
import { totalvariadas } from "./variadas";
export default function Balanco({ totalfixas, totalvariadas }) {
  const [total, setTotal] = useState(0);

  // Faz o cálculo assim que o componente renderiza
  useEffect(() => {
    setTotal(totalfixas + totalvariadas);
  }, [totalfixas, totalvariadas]);

  return (
    <div>O total de despesas é: {total}</div>
  );
}
