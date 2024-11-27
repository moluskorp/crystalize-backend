import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-question.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { resolve } from 'node:path'
import { TestResolver } from './test.resolver'
import { ApolloDriver } from '@nestjs/apollo'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [TestResolver, PrismaService],
})
export class HttpModule {}
