import { FormPrincipal } from "../../components/FormPrincipal";
import { FormSecundario } from "../../components/FormSecundario";

import { useState } from "react";

export function Home() {
  const [fichaId, setFichaId] = useState("");

  return (
    <>
      <h1>Home</h1>
      <FormPrincipal setFichaId={setFichaId} />
      <hr></hr>
      <FormSecundario fichaId={fichaId} />
    </>
  );
}
