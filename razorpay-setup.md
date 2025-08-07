# Razorpay Payment Gateway Setup

## Step 1: Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a new account
3. Complete KYC verification (for live mode)
4. Verify your email and phone number

## Step 2: Get API Keys

### Test Mode (Development)
1. Login to Razorpay Dashboard
2. Go to "Settings" → "API Keys"
3. Under "Test Mode", click "Generate Test Key"
4. Copy the **Key ID** and **Key Secret**

### Live Mode (Production)
1. Complete KYC verification
2. Go to "Settings" → "API Keys"  
3. Under "Live Mode", click "Generate Live Key"
4. Copy the **Key ID** and **Key Secret**

## Step 3: Configure Environment Variables

Update your environment files:

### Backend (.env)
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxx
```

### Frontend (.env.local)
```env
# Razorpay Configuration (Frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

## Step 4: Set Up Webhooks (Optional)

1. Go to "Settings" → "Webhooks"
2. Click "Add New Webhook"
3. Webhook URL: `https://yourdomain.com/api/payments/webhook`
4. Select events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
5. Copy the webhook secret
6. Update `RAZORPAY_WEBHOOK_SECRET` in your .env

## Step 5: Test Payment Integration

### Test Cards for Development

**Successful Payments:**
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payments:**
- Card: 4000 0000 0000 0002
- CVV: Any 3 digits  
- Expiry: Any future date

### UPI Test IDs
- Success: `success@razorpay`
- Failure: `failure@razorpay`

### Net Banking
- Use any test bank from the list
- Use credentials provided in test mode

## Step 6: Verify Integration

### Test Booking Payment
1. Create a test booking in your app
2. Proceed to payment
3. Use test card details
4. Verify payment success/failure handling

### Test Membership Payment
1. Select a membership plan
2. Proceed to payment
3. Complete test transaction
4. Verify membership activation

## Payment Flow in World Across

### 1. Create Order
```javascript
// Frontend calls backend
POST /api/payments/create-order/booking/:bookingId
// or
POST /api/payments/create-order/membership/:membershipId
```

### 2. Initialize Razorpay
```javascript
const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  name: 'World Across',
  description: 'Travel Package Booking',
  order_id: order.id,
  handler: function(response) {
    // Verify payment
    verifyPayment(response);
  }
};

const rzp = new Razorpay(options);
rzp.open();
```

### 3. Verify Payment
```javascript
// Frontend sends to backend
POST /api/payments/verify
{
  razorpay_order_id: "order_xxx",
  razorpay_payment_id: "pay_xxx", 
  razorpay_signature: "signature_xxx",
  type: "booking" // or "membership"
}
```

## Security Best Practices

### 1. Server-Side Verification
- Always verify payment signature on server
- Never trust client-side payment status
- Use webhook for additional verification

### 2. Environment Security
- Keep API secrets secure
- Use different keys for test/live
- Rotate keys periodically

### 3. Amount Validation
- Verify amount on server before creating order
- Prevent amount manipulation
- Log all payment attempts

## Error Handling

### Common Error Codes
- `BAD_REQUEST_ERROR`: Invalid parameters
- `GATEWAY_ERROR`: Payment gateway issues
- `NETWORK_ERROR`: Network connectivity issues
- `SERVER_ERROR`: Razorpay server issues

### Error Handling in Code
```javascript
const rzp = new Razorpay(options);
rzp.on('payment.failed', function(response) {
  console.error('Payment failed:', response.error);
  // Handle payment failure
});
```

## Testing Checklist

### Booking Payments
- [ ] Create booking order
- [ ] Payment modal opens
- [ ] Successful payment flow
- [ ] Failed payment handling
- [ ] Payment verification
- [ ] Booking confirmation
- [ ] Email notifications

### Membership Payments  
- [ ] Create membership order
- [ ] Payment processing
- [ ] Membership activation
- [ ] Usage tracking setup
- [ ] Member benefits activation

### Edge Cases
- [ ] Network interruption during payment
- [ ] Browser refresh during payment
- [ ] Multiple payment attempts
- [ ] Webhook delivery failures
- [ ] Signature verification failures

## Go Live Checklist

### Before Production
- [ ] Complete KYC verification
- [ ] Generate live API keys
- [ ] Update environment variables
- [ ] Set up live webhooks
- [ ] Test with small amounts
- [ ] Set up monitoring and alerts

### Compliance
- [ ] PCI DSS compliance (handled by Razorpay)
- [ ] Data privacy compliance
- [ ] Terms of service updated
- [ ] Refund policy defined
- [ ] Customer support process

## Support and Documentation

- **Razorpay Docs**: https://razorpay.com/docs/
- **Integration Guide**: https://razorpay.com/docs/payments/
- **Test Cards**: https://razorpay.com/docs/payments/payments/test-card-details/
- **Support**: https://razorpay.com/support/

## Pricing (India)

### Domestic Cards
- 2% + GST on successful transactions
- No setup or maintenance fees

### International Cards  
- 3% + GST on successful transactions
- Additional forex charges may apply

### UPI/Net Banking
- 2% + GST on successful transactions
- Lower rates for high volume merchants
