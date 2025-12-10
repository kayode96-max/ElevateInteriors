"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Square } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  length: z.coerce.number().min(0.1, "Length must be positive"),
  width: z.coerce.number().min(0.1, "Width must be positive"),
  wastage: z.coerce.number().min(0).max(100).default(10),
});

type FormValues = z.infer<typeof formSchema>;

export default function FloorCalculator() {
  const [result, setResult] = useState<{ totalArea: number } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: undefined,
      width: undefined,
      wastage: 10,
    },
  });

  function onSubmit(values: FormValues) {
    const baseArea = values.length * values.width;
    const totalArea = baseArea * (1 + values.wastage / 100);
    setResult({ totalArea });
  }

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <span className="p-3 bg-primary/10 rounded-lg text-primary">
            <Square className="h-6 w-6" />
          </span>
          <div>
            <CardTitle className="font-headline text-2xl">Flooring Calculator</CardTitle>
            <CardDescription className="mt-1">Calculate floor area including material wastage.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (ft)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (ft)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="wastage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wastage (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="p-4 bg-muted rounded-lg w-full text-center">
                <p className="text-lg">Total material needed:</p>
                <p className="text-3xl font-bold text-primary">
                  {result.totalArea.toFixed(2)} sq ft
                </p>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
