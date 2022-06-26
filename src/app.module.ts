import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getMongoConfig } from './config/mongo.config'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { FacebookStrategy } from './auth/strategies/facebook.strategy'
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
@Module({
	imports: [
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AuthModule,
		UserModule,
		FileModule,
		ConfigModule,
		CloudinaryModule,
		PostModule,
		CommentModule,
	],
	controllers: [AppController],
	providers: [AppService, FacebookStrategy],
})
export class AppModule {}
