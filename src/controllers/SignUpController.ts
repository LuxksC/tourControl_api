import { z } from 'zod';
import { db } from '../db';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, created } from "../utils/http";
import { signAccessToken } from '../libs/jwt';

// name, email, gender, birthDate, password
const schema = z.object({
  gender: z.enum(['male', 'female']),
  birthDate: z.iso.date(),
  account: z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
  }),
});

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class SignUpController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    // Check if email is already registered
    const userAlreadyExists = await db.query.usersTable.findFirst({
      columns: {
        email: true,
      },
      where: eq(usersTable.email, data.account.email),
    });

    if (userAlreadyExists) {
      return conflict({ error: 'Email already registered.' });
    }

    const { account, ...rest } = data;
    // encode password before saving it
    const hashedPassword = await hash(account.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({
        ...account,
        ...rest,
        password: hashedPassword,
      })
      .returning({ id: usersTable.id });

    const accessToken = signAccessToken(user.id);

    return created({ accessToken });
  }
}