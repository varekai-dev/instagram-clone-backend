import { CommentModel } from './../comment/comment.model'
import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from 'src/user/user.model'

export interface PostModel extends Base {}

export class PostModel extends TimeStamps {
	@prop({ ref: () => UserModel })
	user: Ref<UserModel>

	@prop()
	description: string

	@prop()
	imagePath: string

	@prop({ default: [], ref: () => CommentModel })
	comments?: Ref<CommentModel>[]

	@prop({ default: [], ref: () => UserModel })
	likes?: Ref<UserModel>[]
}
