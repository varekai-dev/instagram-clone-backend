import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { PostDto } from './dto/post.dto'
import { PostModel } from './post.model'

@Injectable()
export class PostService {
	constructor(
		@InjectModel(PostModel)
		private readonly postModel: ModelType<PostModel>
	) {}

	async getAll() {
		return await this.postModel
			.find()
			.populate('user', 'avatarPath userName')
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
}
