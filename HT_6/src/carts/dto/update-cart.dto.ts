import Joi from 'joi'

import { BadRequestException } from '../../infrastructure/exceptions/bad-request.exception';

import { CartItem } from '../cart-item';

const updateCartSchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required().min(0)
})

export class UpdateCartDto {
    productId: string;
    count: number;

    private constructor(body: UpdateCartDto) {
        this.productId = body.productId;
        this.count = body.count
    }

    static validate(body: unknown): UpdateCartDto {
        const result = updateCartSchema.validate(body);
        if (result.error) {
            throw new BadRequestException(result.error.message)
        }
        return new UpdateCartDto(body as UpdateCartDto)
    }
}
