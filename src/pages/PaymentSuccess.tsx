import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, Home, Mail } from 'lucide-react';
import { supabase } from '@/db/supabase';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerificationStatus('failed');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify_stripe_payment', {
          body: JSON.stringify({ sessionId })
        });

        if (error) {
          const errorMsg = await error?.context?.text();
          console.error('Edge function error in verify_stripe_payment:', errorMsg);
          throw new Error(errorMsg || 'Verification failed');
        }

        if (data?.data?.verified) {
          setVerificationStatus('success');
          setPaymentDetails(data.data);
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('failed');
      }
    };

    verifyPayment();
  }, [sessionId]);

  const formatAmount = (amount: number, currency: string) => {
    const value = amount / 100;
    if (currency === 'inr') {
      return `₹${value.toLocaleString('en-IN')}`;
    }
    return `${currency.toUpperCase()} ${value}`;
  };

  return (
    <div className="min-h-screen py-16 xl:py-24 bg-secondary/30">
      <div className="max-w-3xl mx-auto px-4 xl:px-8">
        {verificationStatus === 'loading' && (
          <Card className="shadow-elegant border-border animate-scale-in">
            <CardContent className="p-12 text-center">
              <Loader2 className="h-16 w-16 text-accent mx-auto mb-6 animate-spin" />
              <h2 className="text-2xl font-bold mb-4 text-primary">Verifying Payment...</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment.
              </p>
            </CardContent>
          </Card>
        )}

        {verificationStatus === 'success' && (
          <Card className="shadow-elegant border-border animate-scale-in">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="text-3xl text-primary">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Thank you for enrolling! Your payment has been processed successfully.
                </p>
              </div>

              {paymentDetails && (
                <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-primary mb-4">Payment Details</h3>
                  
                  {paymentDetails.amount && paymentDetails.currency && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Amount Paid:</span>
                      <span className="font-semibold text-xl text-accent">
                        {formatAmount(paymentDetails.amount, paymentDetails.currency)}
                      </span>
                    </div>
                  )}

                  {paymentDetails.customerEmail && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{paymentDetails.customerEmail}</span>
                    </div>
                  )}

                  {paymentDetails.customerName && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{paymentDetails.customerName}</span>
                    </div>
                  )}

                  {paymentDetails.sessionId && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono text-sm">{paymentDetails.sessionId.slice(0, 20)}...</span>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary mb-2">What's Next?</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• You will receive a confirmation email shortly</li>
                      <li>• Course details and schedule will be sent to your email</li>
                      <li>• Our team will contact you within 24 hours</li>
                      <li>• Check your spam folder if you don't see the email</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-4 pt-4">
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full" size="lg">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/courses" className="flex-1">
                  <Button className="w-full" size="lg">
                    Explore More Courses
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {verificationStatus === 'failed' && (
          <Card className="shadow-elegant border-border animate-scale-in">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="text-3xl text-primary">Payment Verification Failed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  We couldn't verify your payment. This could be due to:
                </p>
                <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
                  <li>• Payment was cancelled or incomplete</li>
                  <li>• Session expired</li>
                  <li>• Technical issue during processing</li>
                </ul>
              </div>

              <div className="bg-secondary/50 rounded-lg p-6">
                <p className="text-sm text-muted-foreground">
                  If you believe this is an error or if you were charged, please contact us immediately at{' '}
                  <a href="mailto:info@autointelect.com" className="text-accent hover:underline">
                    info@autointelect.com
                  </a>
                </p>
              </div>

              <div className="flex flex-col xl:flex-row gap-4 pt-4">
                <Link to="/courses" className="flex-1">
                  <Button variant="outline" className="w-full" size="lg">
                    Try Again
                  </Button>
                </Link>
                <Link to="/contact" className="flex-1">
                  <Button className="w-full" size="lg">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
