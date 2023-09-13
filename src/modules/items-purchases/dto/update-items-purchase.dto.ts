import { PartialType } from "@nestjs/swagger";
import { CreateItemsPurchaseDto } from "./create-items-purchase.dto";

export class UpdateItemsPurchaseDto extends PartialType(
    CreateItemsPurchaseDto
) {}
