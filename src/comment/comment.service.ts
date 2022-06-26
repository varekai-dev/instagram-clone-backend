import { createCommentDto } from './dto/createCommentDto'
import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CommentModel } from './comment.model'
import { Types } from 'mongoose'
import { PostService } from 'src/post/post.service'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(CommentModel)
		private readonly commentModel: ModelType<CommentModel>,

		private readonly postService: PostService
	) {}
	async createComment(userId: Types.ObjectId, dto: createCommentDto) {
		const comment = new this.commentModel({
			user: userId,
			content: dto.content,
			post: dto.postId,
		})
		await comment.save()
		await this.postService.updatePostComments(dto.postId, comment._id)
		return comment
	}

	async deleteAllCommentsForPost(postId: string) {
		const comments = await this.commentModel.find({ post: postId })
		if (!comments) throw new NotFoundException('Comments not found')
		await this.commentModel.deleteMany({ post: postId })
		return 'Comments deleted'
	}

	async deleteComment(userId: Types.ObjectId, commentId: Types.ObjectId) {
		const comment = await this.commentModel.findOneAndDelete({
			_id: commentId,
			user: userId,
		})
		if (!comment) throw new NotFoundException('Comment not found')
		await this.postService.updatePostComments(String(comment.post), commentId)
		return 'Comment deleted'
	}
}
