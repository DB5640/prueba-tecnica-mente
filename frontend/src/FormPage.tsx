import { CardWrapper } from "./CardWrapper";
import { FormularioCrearEmpresa } from "./FormularioCrearEmpresa";
import { z } from "zod";
import { formSchema } from "./schemas/empresaFormShema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEmpresa } from "./apiConection";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const FormPage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    z.infer<typeof formSchema>,
    AxiosError,
    z.infer<typeof formSchema>
  >({
    mutationFn: postEmpresa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
      toast.success("Empresa creada exitosamente");
    },
    onError: (err: AxiosError) => {
      console.error("Ha ocurrido un error:", err.message);

      if (err.response) {
        console.error("Código de estado:", err.response.status);
        const errorData = err.response.data;
        if (typeof errorData === "string") {
          toast.error(errorData);
        } else {
          if (
            typeof errorData === "object" &&
            errorData !== null &&
            "message" in errorData
          ) {
            toast.error(errorData.message as string);
          } else {
            toast.error("Error al crear la empresa");
          }
        }
      } else {
        toast.error("Error de red o del servidor");
      }
    },
  });
  const onSubmit = (values: FormData) => {
    const formData = {
      ...values,
      nit: Number(values.nit),
      phone: values.phone ? Number(values.phone) : undefined,
    };
    mutation.mutate(formData);
  };

  type FormData = z.infer<typeof formSchema>;
  return (
    <CardWrapper>
      <FormularioCrearEmpresa onSubmit={onSubmit} state={mutation.status} />
    </CardWrapper>
  );
};
