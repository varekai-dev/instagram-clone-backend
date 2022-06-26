import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { PostModel } from './post.model'
import { CommentModel } from 'src/comment/comment.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PostModel,
				schemaOptions: {
					collection: 'Post',
				},
			},
			{
				typegooseClass: CommentModel,
				schemaOptions: {
					collection: 'Comment',
				},
			},
		]),
	],
	controllers: [PostController],
	providers: [PostService],
	exports: [PostService],
})
export class PostModule {}
