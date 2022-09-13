import { useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";

export function FormPrincipal(props) {
  const [form, setForm] = useState({
    name: "",
    age: 1,
    race: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ironrest.herokuapp.com/alexandreHelpPrincipal",
        form
      );

      props.setFichaId(response.data.insertedId);

      toast.success("Pode seguir para a segunda parte do form!");
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={form.name}
      />
      <label>Idade</label>
      <input
        type="number"
        name="age"
        onChange={handleChange}
        value={form.age}
      />
      <label>Raça</label>
      <input
        type="text"
        name="race"
        onChange={handleChange}
        value={form.race}
      />

      <button>Enviar!</button>
    </form>
  );
}
