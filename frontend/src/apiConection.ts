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