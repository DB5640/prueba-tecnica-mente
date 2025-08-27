import z from "zod";

export const formSchema = z.object({
    name: z.string().min(1, {
        message: "El nombre de la empresa es obligatorio.",
    }),
    nit: z.coerce.number("El NIT debe ser un número").min(9, {
        message: "El NIT debe tener al menos 9 dígitos.",
    }),
    address: z.string().toLowerCase().regex(/^(calle|carrera|diagonal)\s\d{1,3}\s#\d{1,3}-\d{1,3}(\s.*)?$/, {
        message: "La dirección debe tener el formato: Calle 12 #12-12 'resto de datos'"
    }).optional(),
    phone: z.coerce.number("El teléfono debe ser un número").optional(),
})