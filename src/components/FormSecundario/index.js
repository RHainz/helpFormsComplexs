import { useState, useEffect } from "react";
import axios from "axios";

import toast from "react-hot-toast";

export function FormSecundario(props) {
  const [form, setForm] = useState({
    fichaId: "",
    pericias: [],
  });

  useEffect(() => {
    setForm({ ...form, fichaId: props.fichaId });
  }, [props.fichaId]);

  console.log(
    `DENTRO DO FORM SECUNDARIO, RECEBI O ID DA FICHA ${props.fichaId}, E COLOQUEI DENTRO DO FORM`,
    form
  );

  const [currentPericia, setCurrentPericia] = useState({
    pericia: "",
    periciaValue: 0,
    espec: "",
    especValue: 0,
  });

  function handleChange(e) {
    setCurrentPericia({ ...currentPericia, [e.target.name]: e.target.value });
  }

  function handleAddPericia() {
    setForm({ ...form, pericias: [...form.pericias, currentPericia] });

    console.log(form);

    setCurrentPericia({
      pericia: "",
      periciaValue: 0,
      espec: "",
      especValue: 0,
    });

    toast.success("Pericia add.");
  }

  function handleDeletePericia(periciaToDelete) {
    const newForm = form.pericias.filter((currentPericia) => {
      return currentPericia !== periciaToDelete;
    });

    setForm({ ...form, pericias: [...newForm] });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ironrest.herokuapp.com/alexandreHelpSecundaria",
        form
      );

      await axios.put(
        `https://ironrest.herokuapp.com/alexandreHelpPrincipal/${props.fichaId}`,
        { periciaId: response.data.insertedId }
      );

      toast.success("Ficha criada!");
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado!");
    }
  }

  return (
    <>
      <div>
        {form.pericias.map((currentPericia) => {
          console.log(currentPericia);
          return (
            <>
              <strong>{currentPericia.pericia}</strong>
              <p>{currentPericia.periciaValue}</p>
              <strong>Força base = {currentPericia.periciaValue * 3}</strong>
              <button
                type="button"
                onClick={() => {
                  handleDeletePericia(currentPericia);
                }}
              >
                Remover pericia
              </button>
            </>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <label>Pericia</label>
        <input
          type="text"
          name="pericia"
          onChange={handleChange}
          value={currentPericia.pericia}
        />
        <label>Valor</label>
        <input
          type="number"
          name="periciaValue"
          onChange={handleChange}
          value={currentPericia.periciaValue}
        />
        <label>Espec</label>
        <input
          type="text"
          name="espec"
          onChange={handleChange}
          value={currentPericia.espec}
        />

        <label>Valor da espec</label>
        <input
          type="number"
          name="especValue"
          onChange={handleChange}
          value={currentPericia.especValue}
        />

        <button type="button" onClick={handleAddPericia}>
          Add Pericia
        </button>

        <hr></hr>

        <button type="submit">Criar ficha!</button>
      </form>
    </>
  );
}
