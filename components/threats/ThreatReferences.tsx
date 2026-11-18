import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// KEV "notes" is one string of links separated by " ; ". We keep only https links.
const parseLinks = (notes: string): string[] =>
  notes
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith("https://"));

export const ThreatReferences = ({ notes }: { notes: string }) => {
  const links = parseLinks(notes);
  if (links.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>References</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {links.map((href) => (
            <li key={href} className="truncate">
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {href}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};