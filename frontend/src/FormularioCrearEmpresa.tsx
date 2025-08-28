import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { formSchema, type EmpresaFormSchema } from "@/schemas/empresaFormShema";
import type { SubmitHandler } from "react-hook-form";

interface FormularioCrearEmpresaProps {
  onSubmit: SubmitHandler<EmpresaFormSchema>;
  state: "error" | "idle" | "pending" | "success";
}
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardFooter } from "./components/ui/card";
import { Spinner } from "./components/ui/kibo-ui/spinner";
import { cn } from "./lib/utils";
import { useState, type ReactNode } from "react";
import { useEffect } from "react";

export function FormularioCrearEmpresa({
  onSubmit,
  state,
}: FormularioCrearEmpresaProps) {
  const [variant, setVariant] = useState<
    "default" | "outline" | "destructive" | "link" | "secondary" | "ghost"
  >("default");
  const [contenidoButton, setContenidoButton] = useState<string | ReactNode>(
    "Continuar"
  );

  const form = useForm<EmpresaFormSchema>({
    resolver: zodResolver(formSchema),
    /* defaultValues: {
      name: "prueba 4",
      nit: 1232134324,
      address: "Calle 12 #12-12 apartamento 12...",
      phone: 6543321,
    }, */
  });

  useEffect(() => {
    setVariant(
      state === "pending"
        ? "outline"
        : state === "error"
        ? "destructive"
        : "default"
    );
    if (state === "pending") {
      setContenidoButton(() => <Spinner variant="ellipsis" />);
    } else if (state === "success") {
      setContenidoButton("Exito");
    } else if (state === "error") {
      setContenidoButton("Error");
    } else {
      setContenidoButton("Continuar");
    }
    const timeout = setTimeout(() => {
      setVariant("default");
      setContenidoButton("Continuar");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la empresa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre de la empresa"
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIT</FormLabel>
              <FormControl>
                <Input
                  placeholder="NIT"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              <FormDescription>NIT sin signo de verificación.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input
                  placeholder="Calle 12 #12-12 apartamento 12..."
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  placeholder="3001234567"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className={cn("w-full")}
            disabled={state === "pending"}
            variant={variant}
          >
            {contenidoButton}
          </Button>
          <Button
            onClick={() => form.reset()}
            variant="outline"
            className={cn(
              "w-full",
              state === "pending" &&
                "cursor-not-allowed opacity-50 hover:transparent"
            )}
          >
            Cancelar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
