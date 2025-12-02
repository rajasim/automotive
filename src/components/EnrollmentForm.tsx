import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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
      name: '', // Default value for name
      email: '', // Default value for email
      phone: '', // Default value for phone
      education: '', // Default value for education
      experience: '', // Default value for experience
      message: '' // Default value for message (optional)
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsProcessing(true);
    try {
      // Send the form data to the backend (e.g., PHP backend)
      const response = await fetch('http://localhost:80/autointeellence/form-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          education: data.education,
          experience: data.experience,
          message: data.message || '', // message is optional
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for contacting us. We will get back to you soon.',
        });
        if (onSuccess) onSuccess();
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Something went wrong. Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
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

        {/* Email Field */}
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

        {/* Phone Field */}
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

        {/* Education Background Field */}
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

        {/* Experience Level Field */}
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

        {/* Message Field */}
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

        {/* Submit Button */}
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
