import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/index.guard';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  // JwtModule.register({
  //   global: true,
  //   secret: "sdsffsfsf",
  //   signOptions: { expiresIn: '60s' },
  // }),
  JwtModule.registerAsync({
    global:true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
      // global: true,
    }),
    inject: [ConfigService],
  }),
   UserModule, PostModule],
  // controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule { }
