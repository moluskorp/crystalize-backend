import { PrismaService } from '@/prisma/prisma.service'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  hello() {
    return 'Hello Graphql'
  }
}
