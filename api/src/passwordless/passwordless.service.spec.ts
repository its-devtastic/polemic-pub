import { Test, TestingModule } from "@nestjs/testing";
import { PasswordlessService } from "./passwordless.service";

describe("Api-keyService", () => {
  let service: PasswordlessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordlessService],
    }).compile();

    service = module.get<PasswordlessService>(PasswordlessService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
