import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/db/supabase';
import { Loader2 } from 'lucide-react';
import type { Course } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  education: z.string().min(2, 'Please enter your education background'),
  experience: z.string().min(2, 'Please enter your experience level'),
  message: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

interface EnrollmentFormProps {
  course: Course;
  onSuccess?: () => void;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ course, onSuccess }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      education: '',
      experience: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsProcessing(true);
    try {
      const { data: checkoutData, error } = await supabase.functions.invoke('create_stripe_checkout', {
        body: JSON.stringify({
          items: [
            {
              name: course.title,
              price: course.price,
              quantity: 1,
              image_url: course.image
            }
          ],
          currency: course.currency,
          payment_method_types: ['card'],
          enrollment_data: data
        })
      });

      if (error) {
        const errorMsg = await error?.context?.text();
        console.error('Edge function error in create_stripe_checkout:', errorMsg);
        throw new Error(errorMsg || 'Failed to create checkout session');
      }

      if (checkoutData?.data?.url) {
        window.open(checkoutData.data.url, '_blank');
        toast({
          title: 'Redirecting to Payment',
          description: 'Please complete your payment in the new tab.'
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast({
        title: 'Enrollment Failed',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91-XXXX-XXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Background</FormLabel>
              <FormControl>
                <Input placeholder="e.g., B.Tech Mechanical Engineering" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Student / 2 years in automotive" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any specific questions or requirements..."
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Proceed to Payment - ${course.currency === 'INR' ? '₹' : course.currency} ${course.price.toLocaleString('en-IN')}`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EnrollmentForm;
