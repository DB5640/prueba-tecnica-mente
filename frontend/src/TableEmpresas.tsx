import type { ColumnDef } from "@/components/ui/kibo-ui/table";
import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from "@/components/ui/kibo-ui/table";
import type { EmpresaFormSchema } from "./schemas/empresaFormShema";
import { useQuery } from "@tanstack/react-query";
import { fetchEmpresas } from "./apiConection";
import { Spinner } from "./components/ui/kibo-ui/spinner";

// const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
// const statuses = [
//   { id: faker.string.uuid(), name: "Planned", color: "#6B7280" },
//   { id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" },
//   { id: faker.string.uuid(), name: "Done", color: "#10B981" },
// ];
// const users = Array.from({ length: 4 })
//   .fill(null)
//   .map(() => ({
//     id: faker.string.uuid(),
//     name: faker.person.fullName(),
//     image: faker.image.avatar(),
//   }));
// const exampleProducts = Array.from({ length: 4 })
//   .fill(null)
//   .map(() => ({
//     id: faker.string.uuid(),
//     name: capitalize(faker.company.buzzPhrase()),
//   }));
// const exampleInitiatives = Array.from({ length: 2 })
//   .fill(null)
//   .map(() => ({
//     id: faker.string.uuid(),
//     name: capitalize(faker.company.buzzPhrase()),
//   }));
// const exampleReleases = Array.from({ length: 3 })
//   .fill(null)
//   .map(() => ({
//     id: faker.string.uuid(),
//     name: capitalize(faker.company.buzzPhrase()),
//   }));
// const exampleFeatures = Array.from({ length: 20 })
//   .fill(null)
//   .map(() => ({
//     id: faker.string.uuid(),
//     name: capitalize(faker.company.buzzPhrase()),
//     startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
//     endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
//     status: faker.helpers.arrayElement(statuses),
//     owner: faker.helpers.arrayElement(users),
//     product: faker.helpers.arrayElement(exampleProducts),
//     initiative: faker.helpers.arrayElement(exampleInitiatives),
//     release: faker.helpers.arrayElement(exampleReleases),
//   }));
const TableEmpresas = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["empresas"],
    queryFn: fetchEmpresas,
  });
  if (isPending) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;
  const columns: ColumnDef<EmpresaFormSchema>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "nit",
      header: ({ column }) => <TableColumnHeader column={column} title="NIT" />,
      cell: ({ row }) => row.original.nit,
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => row.original.address,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => row.original.phone,
    },
  ];
  return (
    <TableProvider columns={columns} data={data}>
      <TableHeader>
        {({ headerGroup }) => (
          <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
            {({ header }) => <TableHead header={header} key={header.id} />}
          </TableHeaderGroup>
        )}
      </TableHeader>
      <TableBody>
        {({ row }) => (
          <TableRow key={row.id} row={row}>
            {({ cell }) => <TableCell cell={cell} key={cell.id} />}
          </TableRow>
        )}
      </TableBody>
    </TableProvider>
  );
};
export default TableEmpresas;
