import { useState } from "react";
import Variadas from "./variadas";
import Fixas from "./fixas";
import Balanco from "./balanco";

export default function Select() {
    const [tipoConta, setTipoConta] = useState("");
    return (
        <div className="ClasseSelect">
            <div className="cardSelect">
                <select 
                    name="nomeDespesa" 
                    value={tipoConta} 
                    onChange={(e) => setTipoConta(e.target.value)}
                >
                    <option value="">Selecione</option>
                    <option value="fixas">Fixas</option>
                    <option value="variadas">Variadas</option>
                    <option value="balanco">Balanço</option>
                </select>
            </div>

            {tipoConta === "fixas" && <Fixas />}
            {tipoConta === "variadas" && <Variadas />}
            {tipoConta === "balanco" && <Balanco />}
        </div>
    );
}
