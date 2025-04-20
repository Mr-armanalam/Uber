// import { Stripe } from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { name, email, amount } = body;
  
//   if (!name || !email || !amount) {
//     return new Response(
//       JSON.stringify({
//         error: "Please enter a valid email address",
//         status: 400,
//       })
//     );
//   }

//   let customer;

//   const existingCustomer = await stripe.customers.list({email });
//   if (existingCustomer.data.length > 0) {
//     customer = existingCustomer.data[0];
//   } else {
//     customer = await stripe.customers.create({
//       name,
//       email,
//     });
//   }  

//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     {customer: customer.id},
//     {apiVersion: '2024-11-20.acacia'}
//   );
  
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: parseInt(amount) * 100,
//     currency: 'USD',
//     customer: customer.id,
//     automatic_payment_methods: {
//       enabled: true,
//       allow_redirects: 'never',
//     },
//   });  

//   return new Response(JSON.stringify({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id,
//   }));
// }


import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
try {
    const body = await request.json();
    const { name, email, amount } = body;
  
    if (!name || !email || !amount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }
  
    let customer;
    const doesCustomerExist = await stripe.customers.list({
      email,
    });
  
    if (doesCustomerExist.data.length > 0) {
      customer = doesCustomerExist.data[0];
    } else {
      const newCustomer = await stripe.customers.create({
        name,
        email,
      });
  
      customer = newCustomer;
    }
  
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-06-20" },
    );
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });    
  
    return new Response(
      JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey,
        customer: customer.id,
      }),
      {
        status: 200
      }
    );
} catch (error) {
  console.log(error);
throw new Error('something is wrong');
}
}