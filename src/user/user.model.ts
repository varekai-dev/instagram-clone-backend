import { prop } from '@typegoose/typegoose'
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
	username: string

	@prop()
	avatarPath: string

	@prop({ default: false })
	isFacebookUser: boolean
}
