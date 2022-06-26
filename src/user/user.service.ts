import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserModel } from './user.model'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async byId(id: string): Promise<DocumentType<UserModel>> {
		const user = await this.UserModel.findById(id).exec()

		if (!user) throw new NotFoundException('User not found')

		return user
	}
	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id)
		const isSameUser = await this.UserModel.findOne({ email: dto.email })

		if (isSameUser && String(_id) !== String(isSameUser._id)) {
			throw new NotFoundException('Email already exists')
		}
		if (dto.avatarPath) {
			user.avatarPath = dto.avatarPath
		}
		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}
		user.email = dto.email

		await user.save()
		return
	}
}
