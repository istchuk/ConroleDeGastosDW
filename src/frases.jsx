import React, { useState, useEffect } from "react";

export default function FraseMotivacional() {
  const [frase, setFrase] = useState("");
  const [autor, setAutor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random"))
    .then((res) => res.json())
    .then((data) => {
      const json = JSON.parse(data.contents);
      setFrase(json[0].q);
      setAutor(json[0].a);
      setLoading(false);
    })
    .catch(() => {
      setFrase("Erro ao carregar frase.");
      setAutor("");
      setLoading(false);
    });
}, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <p>"{frase}"</p>
      <p>- {autor}</p>
    </div>
  );
}
