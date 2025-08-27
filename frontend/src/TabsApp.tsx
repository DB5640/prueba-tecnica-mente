// import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormPage } from "./FormPage";
import TableEmpresas from "./TableEmpresas";
import { useState } from "react";

export function TabsApp() {
  const [tab, setTab] = useState("form");
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Tabs value={tab} onValueChange={setTab} className="min-w-[384px]">
        <TabsList>
          <TabsTrigger value="form">Formulario</TabsTrigger>
          <TabsTrigger value="table">Tabla</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <FormPage />
        </TabsContent>
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Empresas</CardTitle>
              <CardDescription>Listado de Empresas.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <TableEmpresas />
            </CardContent>
            <CardFooter>
              <Button onClick={() => setTab("form")}>Agregar registro</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
