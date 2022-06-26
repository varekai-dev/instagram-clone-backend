import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop({ default: null })
	password?: string | null

	@prop()
	fullName: string

	@prop({ unique: true })
	userName: string

	@prop({ default: null })
	avatarPath: string

	@prop({ default: false })
	isFacebookUser: boolean

	@prop({ default: [], ref: () => UserModel })
	following: Ref<UserModel>[]

	@prop({ default: [], ref: () => UserModel })
	followers: Ref<UserModel>[]
}
