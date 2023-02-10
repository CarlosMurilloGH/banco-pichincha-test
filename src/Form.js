import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [values, setValues] = useState({
    Nombre: "",
    Imagen: "",
    Ataque: 10,
    Defensa:30,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://63e17fbd65b57fe6065987c7.mockapi.io/api/Pokemon/", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInput1Change = (event) => {
    setValues({
      ...values,
      Nombre: event.target.value,
    });
  };

  const handleInput2Change = (event) => {
    setValues({
      ...values,
      Imagen: event.target.value,
    });
  };

  const handleInput3Change = (event) => {
    setValues({
      ...values,
      input3: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Nombre"
        onChange={handleInput1Change}
        value={values.input1}
      />
      <input
        type="text"
        name="Imagen"
        onChange={handleInput2Change}
        value={values.input2}
      />
      <input
        type="text"
        name="input3"
        onChange={handleInput3Change}
        value={values.input3}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
