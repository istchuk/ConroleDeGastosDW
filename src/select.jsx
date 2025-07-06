import { useState, useEffect } from "react";
import Variadas from "./variadas";
import Fixas from "./fixas";



export default function Select() {
    const [tipoConta, setTipoConta] = useState("");
    const [fixas, setFixas] = useState([]);
    const [variadas, setVariadas] = useState([]);

    useEffect(() => {
    const fixasSalvas = localStorage.getItem("contasFixas");
    const variadasSalvas = localStorage.getItem("contasVariadas");

    if (fixasSalvas) setFixas(JSON.parse(fixasSalvas));
    if (variadasSalvas) setVariadas(JSON.parse(variadasSalvas));
    }, []);

    const todas = [...fixas, ...variadas];
    const totalGeral = todas.reduce((acc, conta) => acc + conta.valor, 0);
    const totalFixas = fixas.reduce((acc, conta) => acc + conta.valor, 0);
    const totalVariadas = variadas.reduce((acc, conta) => acc + conta.valor, 0);

    const gastosPorCategoria = todas.reduce((acc, conta) => {
    const cat = conta.categoria || "Sem categoria";
    acc[cat] = (acc[cat] || 0) + conta.valor;
    return acc;
    }   , {});

    return (
        <div className="ClasseSelect">
            <div className="cardSelect">
                <div className="painel-resumo">
                    <h2>Resumo Geral</h2>
                    <p><strong>Total Geral:</strong> R$ {totalGeral.toFixed(2)}</p>
                    <p><strong>Fixas:</strong> R$ {totalFixas.toFixed(2)}</p>
                    <p><strong>Variadas:</strong> R$ {totalVariadas.toFixed(2)}</p>

                    <h3 style={{ marginTop: "10px" }}>Gastos por Categoria</h3>
                    <ul>
                        {Object.entries(gastosPorCategoria).map(([categoria, valor]) => (
                            <li key={categoria}>
                                {categoria}: R$ {valor.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>

                <select 
                    name="nomeDespesa" 
                    value={tipoConta} 
                    onChange={(e) => setTipoConta(e.target.value)}
                >
                    <option value="">Selecione</option>
                    <option value="fixas">Fixas</option>
                    <option value="variadas">Variadas</option>
                </select>
            </div>

            {tipoConta === "fixas" && <Fixas />}
            {tipoConta === "variadas" && <Variadas />}
        </div>
    );
}
