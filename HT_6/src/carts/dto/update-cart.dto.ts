import Joi from 'joi'

import { BadRequestException } from '../../infrastructure/exceptions/bad-request.exception';

import { CartItem } from '../cart-item';

const updateCartSchema = Joi.object({
    id: Joi.string().required(),
    items: Joi.array().items(
        Joi.object().keys({
            product: Joi.object().keys({
                "id": Joi.string().required(),
                "title": Joi.string().required().messages({
                    'string.base': 'Product title should be string, but not number',
                }),
                "description": Joi.string().required(),
                "price": Joi.number().required()
            }),
            count: Joi.number().required().min(0)
        })
    ),
})

export class UpdateCartDto {
    id: string;
    isDeleted: boolean;
    items: CartItem[];

    private constructor(body: UpdateCartDto) {
        this.id = body.id;
        this.isDeleted = body.isDeleted
        this.items = body.items
    }

    static validate(body: unknown): UpdateCartDto {
        const result = updateCartSchema.validate(body);
        if (result.error) {
            throw new BadRequestException(result.error.message)
        }
        return new UpdateCartDto(body as UpdateCartDto)
    }
}
