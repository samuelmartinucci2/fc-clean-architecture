import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();    
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const product = ProductFactory.create("a", "Product 1", 1.0);

    await productRepository.create(product);

    const input = {
      id: product.id,
      name: "Product Update",
      price: 2.0
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
