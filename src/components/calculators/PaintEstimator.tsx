"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PaintRoller } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  totalArea: z.coerce.number().min(1, "Total area must be positive"),
  coats: z.coerce.number().int().min(1).default(2),
  coverage: z.coerce.number().min(1).default(350),
});

type FormValues = z.infer<typeof formSchema>;

export default function PaintEstimator() {
  const [result, setResult] = useState<{ gallons: number } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalArea: undefined,
      coats: 2,
      coverage: 350,
    },
  });

  function onSubmit(values: FormValues) {
    const totalPaintArea = values.totalArea * values.coats;
    const gallons = Math.ceil(totalPaintArea / values.coverage);
    setResult({ gallons });
  }

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <span className="p-3 bg-primary/10 rounded-lg text-primary">
            <PaintRoller className="h-6 w-6" />
          </span>
          <div>
            <CardTitle className="font-headline text-2xl">Paint Estimator</CardTitle>
            <CardDescription className="mt-1">Estimate the amount of paint needed for your walls and ceiling.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="totalArea" render={({ field }) => (<FormItem><FormLabel>Total Area (sq ft)</FormLabel><FormControl><Input type="number" placeholder="e.g., 450" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="coats" render={({ field }) => (<FormItem><FormLabel>Number of Coats</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="coverage" render={({ field }) => (<FormItem><FormLabel>Coverage per Gallon (sq ft)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="p-4 bg-muted rounded-lg w-full text-center">
                <p className="text-lg">You will need approximately:</p>
                <p className="text-3xl font-bold text-primary">
                  {result.gallons} {result.gallons === 1 ? 'Gallon' : 'Gallons'} of paint
                </p>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
