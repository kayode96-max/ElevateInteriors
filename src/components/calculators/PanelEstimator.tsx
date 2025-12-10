"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LayoutPanelTop } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  totalArea: z.coerce.number().min(1, "Total area must be positive"),
  panelWidth: z.coerce.number().min(0.1, "Panel width must be positive"),
  panelHeight: z.coerce.number().min(0.1, "Panel height must be positive"),
  unit: z.enum(['ft', 'in']).default('ft'),
});

type FormValues = z.infer<typeof formSchema>;

export default function PanelEstimator() {
  const [result, setResult] = useState<{ numPanels: number } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalArea: undefined,
      panelWidth: undefined,
      panelHeight: undefined,
      unit: 'ft',
    },
  });

  function onSubmit(values: FormValues) {
    let panelArea = values.panelWidth * values.panelHeight;
    if (values.unit === 'in') {
      panelArea = panelArea / 144; // Convert sq inches to sq feet
    }
    if (panelArea === 0) {
      form.setError("panelWidth", { message: "Panel area cannot be zero." });
      return;
    }
    const numPanels = Math.ceil(values.totalArea / panelArea);
    setResult({ numPanels });
  }

  const unit = form.watch('unit');

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <span className="p-3 bg-primary/10 rounded-lg text-primary">
            <LayoutPanelTop className="h-6 w-6" />
          </span>
          <div>
            <CardTitle className="font-headline text-2xl">Panel Estimator</CardTitle>
            <CardDescription className="mt-1">Estimate the number of panels needed for a given area.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="totalArea" render={({ field }) => (<FormItem><FormLabel>Total Area (sq ft)</FormLabel><FormControl><Input type="number" placeholder="e.g., 120" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="unit" render={({ field }) => (
                <FormItem><FormLabel>Panel Dimensions Unit</FormLabel>
                <FormControl>
                    <div className="flex items-center space-x-2">
                        <Button type="button" variant={unit === 'ft' ? 'secondary' : 'outline'} className={unit === 'ft' ? 'ring-2 ring-primary' : ''} onClick={() => field.onChange('ft')}>Feet</Button>
                        <Button type="button" variant={unit === 'in' ? 'secondary' : 'outline'} className={unit === 'in' ? 'ring-2 ring-primary' : ''} onClick={() => field.onChange('in')}>Inches</Button>
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )} />
            <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="panelWidth" render={({ field }) => (<FormItem><FormLabel>Panel Width ({unit})</FormLabel><FormControl><Input type="number" placeholder="e.g., 4" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="panelHeight" render={({ field }) => (<FormItem><FormLabel>Panel Height ({unit})</FormLabel><FormControl><Input type="number" placeholder="e.g., 8" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="p-4 bg-muted rounded-lg w-full text-center">
                <p className="text-lg">Number of panels needed:</p>
                <p className="text-3xl font-bold text-primary">
                  {result.numPanels}
                </p>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
