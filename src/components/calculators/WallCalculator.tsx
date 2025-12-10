"use client";

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RectangleVertical, PlusCircle, Trash2, DoorOpen, MinusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const wallSchema = z.object({ length: z.coerce.number().min(0.1) });
const openingSchema = z.object({ width: z.coerce.number().min(0.1), height: z.coerce.number().min(0.1), quantity: z.coerce.number().int().min(1) });

const formSchema = z.object({
  height: z.coerce.number().min(0.1, "Height must be positive"),
  walls: z.array(wallSchema).min(1, "Add at least one wall"),
  doors: z.array(openingSchema).optional(),
  windows: z.array(openingSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function WallCalculator() {
  const [result, setResult] = useState<{ totalWallArea: number; totalOpeningArea: number; finalArea: number; } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: '' as any,
      walls: [{ length: '' as any }],
      doors: [],
      windows: [],
    },
  });

  const { fields: wallFields, append: appendWall, remove: removeWall } = useFieldArray({ control: form.control, name: "walls" });
  const { fields: doorFields, append: appendDoor, remove: removeDoor } = useFieldArray({ control: form.control, name: "doors" });
  const { fields: windowFields, append: appendWindow, remove: removeWindow } = useFieldArray({ control: form.control, name: "windows" });

  function onSubmit(values: FormValues) {
    const totalWallArea = values.walls.reduce((acc, wall) => acc + (wall.length * values.height), 0);
    const totalDoorArea = values.doors?.reduce((acc, door) => acc + (door.width * door.height * door.quantity), 0) ?? 0;
    const totalWindowArea = values.windows?.reduce((acc, window) => acc + (window.width * window.height * window.quantity), 0) ?? 0;
    const totalOpeningArea = totalDoorArea + totalWindowArea;
    const finalArea = totalWallArea - totalOpeningArea;
    setResult({ totalWallArea, totalOpeningArea, finalArea: Math.max(0, finalArea) });
  }

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <span className="p-3 bg-primary/10 rounded-lg text-primary">
            <RectangleVertical className="h-6 w-6" />
          </span>
          <div>
            <CardTitle className="font-headline text-2xl">Wall Area Calculator</CardTitle>
            <CardDescription className="mt-1">Calculate total wall area and subtract openings for paint or wallpaper.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium text-lg">1. Wall Dimensions</h3>
              <FormField control={form.control} name="height" render={({ field }) => (
                <FormItem>
                  <FormLabel>Common Wall Height (ft)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 8" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {wallFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                  <FormField control={form.control} name={`walls.${index}.length`} render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Wall {index + 1} Length (ft)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 12" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeWall(index)} disabled={wallFields.length <= 1}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Remove wall</span>
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendWall({ length: '' as any })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Wall
              </Button>
            </div>
            
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium text-lg">2. Openings (Optional)</h3>
              {doorFields.map((field, index) => (
                <div key={field.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex justify-between items-center"><p className="font-medium">Door {index + 1}</p><Button type="button" variant="ghost" size="icon" onClick={() => removeDoor(index)}><MinusCircle className="h-4 w-4 text-destructive" /><span className="sr-only">Remove Door</span></Button></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <FormField control={form.control} name={`doors.${index}.width`} render={({ field }) => (<FormItem><FormLabel>Width (ft)</FormLabel><FormControl><Input type="number" placeholder="3" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`doors.${index}.height`} render={({ field }) => (<FormItem><FormLabel>Height (ft)</FormLabel><FormControl><Input type="number" placeholder="6.8" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`doors.${index}.quantity`} render={({ field }) => (<FormItem><FormLabel>Qty</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl></FormItem>)} />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendDoor({ width: 3, height: 6.8, quantity: 1 })}> <DoorOpen className="mr-2 h-4 w-4" /> Add Door </Button>
              
              <Separator className="my-4"/>

              {windowFields.map((field, index) => (
                <div key={field.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex justify-between items-center"><p className="font-medium">Window {index + 1}</p><Button type="button" variant="ghost" size="icon" onClick={() => removeWindow(index)}><MinusCircle className="h-4 w-4 text-destructive" /><span className="sr-only">Remove Window</span></Button></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <FormField control={form.control} name={`windows.${index}.width`} render={({ field }) => (<FormItem><FormLabel>Width (ft)</FormLabel><FormControl><Input type="number" placeholder="4" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`windows.${index}.height`} render={({ field }) => (<FormItem><FormLabel>Height (ft)</FormLabel><FormControl><Input type="number" placeholder="3" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`windows.${index}.quantity`} render={({ field }) => (<FormItem><FormLabel>Qty</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl></FormItem>)} />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendWindow({ width: 4, height: 3, quantity: 1 })}> <PlusCircle className="mr-2 h-4 w-4" /> Add Window </Button>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="p-4 bg-muted rounded-lg w-full space-y-2 text-center">
                <p className="text-lg">Total Area for Paint/Wallpaper:</p>
                <p className="text-3xl font-bold text-primary">{result.finalArea.toFixed(2)} sq ft</p>
                <p className="text-sm text-muted-foreground">
                  (Total Wall: {result.totalWallArea.toFixed(2)} sq ft − Openings: {result.totalOpeningArea.toFixed(2)} sq ft)
                </p>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
