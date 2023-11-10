import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'

import { User } from '@src/users/users.entity'

import { UserDataModel } from './data-models/user'
import { Product } from '@src/products/products.entity'
import { ProductDataModel } from './data-models/product'

const FillDB: RequestHandler = async (req, res) => {
  const encryptedPassword = await bcrypt.hash('some_pass', 10)
  await UserDataModel.create(
    UserDataModel.fromDomain(
      new User('1', 'email', encryptedPassword, 'admin'),
    ),
  )
  await ProductDataModel.create(
    ProductDataModel.fromDomain(
      new Product('3', 'Product 1', 'Product 1 Description', 50),
    ),
  )
  await ProductDataModel.create(
    ProductDataModel.fromDomain(
      new Product('4', 'Product 2', 'Product 2 Description', 28),
    ),
  )

  res.send(200)
}
export default FillDB
