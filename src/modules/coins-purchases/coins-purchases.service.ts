import { ForbiddenError } from "@casl/ability";
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { STRIPE_CLIENT } from "src/core/constants/stripe";
import { Stripe } from "stripe";
import { CreateCoinsPurchaseDto } from "./dto/create-coins-purchase.dto";
@Injectable()
export class CoinsPurchasesService {
    constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {}
    create(createCoinsPurchaseDto: CreateCoinsPurchaseDto) {
        return "This action adds a new coinsPurchase";
    }

    async findAll() {
        try {
            const r = await this.stripe.customers.list();
            return r;
        } catch (error) {
            throw new ForbiddenException("bla");
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} coinsPurchase`;
    }
}
