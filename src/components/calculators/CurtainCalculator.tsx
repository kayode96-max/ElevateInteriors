"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PanelTop } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  windowWidth: z.coerce.number().min(1, "Window width must be positive"),
  windowHeight: z.coerce.number().min(1, "Window height must be positive"),
  fullness: z.enum(["1.5", "2.0", "2.5"]).default("2.0"),
  stackback: z.coerce.number().min(0).default(6),
  overlap: z.coerce.number().min(0).default(3),
  aboveOffset: z.coerce.number().min(0).default(6),
  belowOffset: z.coerce.number().min(0).default(4),
});

type FormValues = z.infer<typeof formSchema>;

export default function CurtainCalculator() {
  const [result, setResult] = useState<{ curtainWidth: number, curtainHeight: number, rodWidth: number } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      windowWidth: undefined,
      windowHeight: undefined,
      fullness: "2.0",
      stackback: 6,
      overlap: 3,
      aboveOffset: 6,
      belowOffset: 4,
    },
  });

  function onSubmit(values: FormValues) {
    const fullnessMultiplier = parseFloat(values.fullness);
    const rodWidth = values.windowWidth + (values.stackback * 2);
    const curtainWidth = (rodWidth + values.overlap) * fullnessMultiplier;
    const curtainHeight = values.windowHeight + values.aboveOffset + values.belowOffset;
    setResult({ curtainWidth, curtainHeight, rodWidth });
  }

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <span className="p-3 bg-primary/10 rounded-lg text-primary">
            <PanelTop className="h-6 w-6" />
          </span>
          <div>
            <CardTitle className="font-headline text-2xl">Curtain Calculator</CardTitle>
            <CardDescription className="mt-1">Determine the optimal size for your curtains and rod.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="windowWidth" render={({ field }) => (<FormItem><FormLabel>Window Width (in)</FormLabel><FormControl><Input type="number" placeholder="e.g., 36" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="windowHeight" render={({ field }) => (<FormItem><FormLabel>Window Height (in)</FormLabel><FormControl><Input type="number" placeholder="e.g., 48" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <FormField control={form.control} name="fullness" render={({ field }) => (
                <FormItem><FormLabel>Fullness</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select fullness ratio" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="1.5">Standard (1.5x)</SelectItem><SelectItem value="2.0">Full (2.0x)</SelectItem><SelectItem value="2.5">Extra Full (2.5x)</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField control={form.control} name="stackback" render={({ field }) => (<FormItem><FormLabel>Stackback (in)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="overlap" render={({ field }) => (<FormItem><FormLabel>Overlap (in)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="aboveOffset" render={({ field }) => (<FormItem><FormLabel>Above frame (in)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="belowOffset" render={({ field }) => (<FormItem><FormLabel>Below frame (in)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="p-4 bg-muted rounded-lg w-full grid grid-cols-1 sm:grid-cols-3 text-center gap-4">
                <div><p className="text-lg">Rod Width</p><p className="text-2xl font-bold text-primary">{result.rodWidth.toFixed(1)}"</p></div>
                <div><p className="text-lg">Curtain Width</p><p className="text-2xl font-bold text-primary">{result.curtainWidth.toFixed(1)}"</p></div>
                <div><p className="text-lg">Curtain Height</p><p className="text-2xl font-bold text-primary">{result.curtainHeight.toFixed(1)}"</p></div>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
