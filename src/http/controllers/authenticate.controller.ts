import {
  Body,
  Controller,
  Post,
  UsePipes,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '@/prisma/prisma.service'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

const authenticateBodyBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodyBodySchema = z.infer<typeof authenticateBodyBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @UsePipes(new ZodValidationPipe(authenticateBodyBodySchema))
  @Post()
  async handle(@Body() body: AuthenticateBodyBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('USer credentials do not match')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('USer credentials do not match')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}
