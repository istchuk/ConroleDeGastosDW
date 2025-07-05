import { useState } from "react";

export default function Variadas() {
    // Carrega do localStorage diretamente
    const [contas, setContas] = useState(() => {
        try {
            const contasSalvas = localStorage.getItem("contasVariadas");
            return contasSalvas ? JSON.parse(contasSalvas) : [];
        } catch (error) {
            console.error("Erro ao carregar contas:", error);
            return [];
        }
    });

    const [nomeConta, setNomeConta] = useState("");
    const [valorConta, setValorConta] = useState("");
    const [dataConta, setDataConta] = useState("");
    const [editandoIndex, setEditandoIndex] = useState(null);

    function salvarLocalStorage(lista) {
        localStorage.setItem("contasVariadas", JSON.stringify(lista));
    }

    function adicionarConta() {
        if (nomeConta && valorConta) {
            const novaConta = {
                nome: nomeConta,
                valor: parseFloat(valorConta),
                data: dataConta
            };

            let novaLista;
            if (editandoIndex !== null) {
                novaLista = [...contas];
                novaLista[editandoIndex] = novaConta;
                setEditandoIndex(null);
            } else {
                novaLista = [...contas, novaConta];
            }

            setContas(novaLista);
            salvarLocalStorage(novaLista);

            setNomeConta("");
            setValorConta("");
            setDataConta("");
        }
    }

    function clicarTecla(e) {
        if (e.key === "Enter") {
            adicionarConta();
        }
    }

    function editarConta(index) {
        const conta = contas[index];
        setNomeConta(conta.nome);
        setValorConta(conta.valor.toString());
        setDataConta(conta.data);
        setEditandoIndex(index);
    }

    function excluirConta(index) {
        const novaLista = contas.filter((_, i) => i !== index);
        setContas(novaLista);
        salvarLocalStorage(novaLista);
    }

    function formatarData(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    const total = contas.reduce((acc, conta) => acc + conta.valor, 0);

    return (
        <div className="despesas">
            <h1>Despesas Variadas</h1>
            <div className="card">
                <div className="inputs">
                    <input 
                        type="text" 
                        placeholder="Nome despesa"
                        value={nomeConta}
                        onChange={(e) => setNomeConta(e.target.value)}
                        onKeyDown={clicarTecla}
                    />
                    <input 
                        type="number" 
                        placeholder="Valor"
                        value={valorConta}
                        onChange={(e) => setValorConta(e.target.value)}
                        onKeyDown={clicarTecla}
                    />
                    <input 
                        type="date"
                        value={dataConta}
                        onChange={(e) => setDataConta(e.target.value)}
                        onKeyDown={clicarTecla}
                    />
                    <button onClick={adicionarConta}>
                        {editandoIndex !== null ? "Salvar" : "Adicionar"}
                    </button>
                </div>

                <div className="lista-contas">
                    <div className="lista-scroll">
                        {contas.length > 0 ? (
                            <ul>
                                {contas.map((conta, index) => (
                                    <li key={index} className="item-conta">
                                        <div className="descricao-li">
                                            {index + 1}. {conta.nome} - {formatarData(conta.data)} - 
                                            <span className="valor-conta"> R${conta.valor.toFixed(2)}</span>
                                        </div>
                                        <div className="botao-li">
                                            <button onClick={() => editarConta(index)}>Editar</button>
                                            <button onClick={() => excluirConta(index)}>Excluir</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhuma conta cadastrada.</p>
                        )}
                    </div>
                </div>

                <div className="resumo-total">
                    <h3>Total: R$ {total.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
}
