import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CommentModel } from 'src/comment/comment.model'
import { CommentService } from 'src/comment/comment.service'
import { PostDto } from './dto/post.dto'
import { PostModel } from './post.model'

@Injectable()
export class PostService {
	constructor(
		@InjectModel(CommentModel)
		private readonly commentModel: ModelType<CommentModel>,
		@InjectModel(PostModel)
		private readonly postModel: ModelType<PostModel>
	) {}

	async getAll() {
		return await this.postModel
			.find()
			.populate({
				path: 'comments',
				populate: { path: 'user', select: 'email userName avatarPath' },
			})
			.populate('user', 'email userName avatarPath')
			.exec()
	}
	async makePost(_id: string, dto: PostDto) {
		const post = new this.postModel({
			user: _id,
			content: dto.description,
			imagePath: dto.imagePath,
		})

		return await post.save()
	}

	async updatePostComments(postId: string, commentId: Types.ObjectId) {
		const post = await this.postModel.findById({
			_id: postId,
		})
		if (!post) throw new NotFoundException('Post not found')
		if (post.comments.includes(commentId)) {
			post.comments = post.comments.filter(
				(user) => user.toString() !== commentId.toString()
			)
		} else {
			post.comments = [...post.comments, commentId]
		}
		post.save()
	}

	async deletePost(postId, userId) {
		const post = await this.postModel.findOneAndDelete({
			_id: postId,
			user: userId,
		})
		if (!post) throw new NotFoundException('Post not found')
		await this.commentModel.deleteMany({ post: postId })
		return 'Post deleted'
	}
}
