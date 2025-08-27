import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Ingresa los datos de tu empresa</CardTitle>
        <CardDescription>
          Ingresa los datos de tu empresa para continuar
        </CardDescription>
        <CardAction>
          <Button
            onClick={() =>
              window.open(
                new URL("https://wa.me/573108935340?text=Hola, Necesito Ayuda"),
                "_blank"
              )
            }
            variant="outline"
          >
            Ayuda
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
