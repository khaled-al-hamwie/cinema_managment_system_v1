import { DynamicModule, Module, Provider } from "@nestjs/common";
import { Stripe } from "stripe";
import { STRIPE_CLIENT } from "../constants/stripe";

@Module({})
export class StripeModule {
    static forRoot(apikey: string, config: Stripe.StripeConfig): DynamicModule {
        const stripe = new Stripe(apikey, config);
        const stripeProvider: Provider = {
            provide: STRIPE_CLIENT,
            useValue: stripe,
        };
        return {
            module: StripeModule,
            providers: [stripeProvider],
            exports: [stripeProvider],
            global: true,
        };
    }
}
