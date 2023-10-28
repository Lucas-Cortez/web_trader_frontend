type AppErrorsAttributes = {
  statusCode: number;
  message: string;
};

export class AppError extends Error {
  statusCode: number;

  constructor({ statusCode, message }: AppErrorsAttributes) {
    super(message);
    this.statusCode = statusCode;
  }
}
