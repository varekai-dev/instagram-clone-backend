import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { PostModel } from './post.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PostModel,
				schemaOptions: {
					collection: 'Post',
				},
			},
		]),
	],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
