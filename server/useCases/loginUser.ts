export class RegisterUserUseCase implements IUseCase<RegisterUserInput, RegisterUserOutput> {
  constructor(
    private readonly tokenService: TokenService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const { email, name, password } = input;

    const existingUser = await this.userRepository.getUserByEmail(input.email);

    const salt = await this.hashingService.generateSalt();

    const hashedPassword = await this.hashingService.hash(input.password, salt);

    if (existingUser) throw new AppError({ statusCode: 400, message: "error creating user" });

    const userEntity = UserEntity.create(input.email, input.name, salt, hashedPassword);

    const user = await this.userRepository.createUser(userEntity);

    const { accessToken } = this.tokenService.sign(user);

    return { accessToken, user: { id: user.id, name: user.name, email: user.email } };
  }
}
