import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = ProductFactory.create("a", "Product 1", 1.0);

    await productRepository.create(product);

    const input = {
      name: product.name,
      price: product.price
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: result.id,
      name: product.name,
      price: product.price
    });
  });
});
