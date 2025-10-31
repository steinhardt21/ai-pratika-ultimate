"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Preloaded, usePreloadedQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useState, useMemo } from "react"
import { toast } from "sonner"

interface TaxonomySheetProps {
  preloadedProfessions: Preloaded<typeof api.profession.getProfessions>;
  createProfessionAction: (formData: FormData) => Promise<void>;
}

export function TaxonomySheet({ preloadedProfessions, createProfessionAction }: TaxonomySheetProps) {
  const professions = usePreloadedQuery(preloadedProfessions);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDuplicate = useMemo(() => {
    if (!name.trim() || isSubmitting) return false;
    return professions.some(
      profession => profession.name?.toLowerCase() === name.trim().toLowerCase()
    );
  }, [name, professions, isSubmitting]);

  const handleSubmit = async () => {
    if (isDuplicate || !name.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("description", description.trim());
        
        await createProfessionAction(formData);
        
        // Reset form
        setName("");
        setDescription("");

        toast.success("Professione creata", {
          position: 'top-center',
          description: "La professione è stata creata con successo.",
        })
    } catch (error) {
      toast.error("Errore", {
        position: 'top-center',
        description: "Errore nella creazione della professione: " + error,
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Aggiungi</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Aggiungi una nuova professione</SheetTitle>
          <SheetDescription>
            Inserisci il nome e la descrizione della nuova professione.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="profession-name">Nome</Label>
            <Input 
              id="profession-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Marketing Manager"
              className={isDuplicate ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {isDuplicate && (
              <p className="text-sm text-red-500">
                Questa professione esiste già
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="profession-description">Descrizione</Label>
            <Input 
              id="profession-description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrizione della professione..."
              disabled={isSubmitting}
            />
          </div>
        </div>
        <SheetFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isDuplicate || !name.trim() || isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salva"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline" disabled={isSubmitting}>Chiudi</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
