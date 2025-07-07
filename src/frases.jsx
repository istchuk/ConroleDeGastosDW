// importando funcionalidades do react
import React, { useState, useEffect } from "react";

// componente que exibe uma frase motivacional aleatória
export default function FraseMotivacional() {
  // variaveis para armazenar a frase, o autor e o carregamento
  const [frase, setFrase] = useState("");
  const [autor, setAutor] = useState("");
  const [loading, setLoading] = useState(true); // para saber quando ta carregando a frase

  // busca a frase na API quando o componente é montado
  useEffect(() => {
    fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random"))
      .then((res) => res.json()) // converte a resposta para JSON
      .then((data) => {
        const json = JSON.parse(data.contents); // extrai os dados da resposta da API
        setFrase(json[0].q); // define a frase
        setAutor(json[0].a); // define o autor
        setLoading(false);   // finaliza o carregamento
      })
      .catch(() => {
        // em caso de erro no carregamento
        setFrase("Erro ao carregar frase.");
        setAutor("");
        setLoading(false);
      });
  }, []);

  // enquanto carrega, mostra uma mensagem
  if (loading) return <p>Carregando...</p>;

  // exibe a frase e o autor
  return (
    <div>
      <p>"{frase}"</p>
      <p>- {autor}</p>
    </div>
  );
}
