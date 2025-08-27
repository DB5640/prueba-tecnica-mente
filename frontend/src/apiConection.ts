import axios from "axios";
import { formSchema } from "./schemas/empresaFormShema";
import { z } from "zod";

export const postEmpresa = async (values: z.infer<typeof formSchema>) => {
  const response = await axios.post("http://localhost:8080/empresas", values)
  if (response.status !== 201) {
    throw new Error("Error al crear la empresa")
  }
  return response.data
}

export const fetchEmpresas = async () => {
  const response = await axios.get("http://localhost:8080/empresas")
  if (response.status !== 200) {
    throw new Error("Error al obtener las empresas")
  }
  return response.data
}