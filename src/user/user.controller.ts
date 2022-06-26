import { Body, Get, HttpCode, Put } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserService } from './user.service'
import { User } from './decorators/user.decorators'
import { ValidationPipe } from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { Types } from 'mongoose'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@User('_id') _id: string) {
		return this.userService.byId(_id)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(_id, dto)
	}
}
