import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { CommentModel } from './comment.model'
import { PostModule } from 'src/post/post.module'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: CommentModel,
				schemaOptions: {
					collection: 'Comment',
				},
			},
		]),
		PostModule,
	],
	controllers: [CommentController],
	providers: [CommentService],
	exports: [CommentService],
})
export class CommentModule {}
