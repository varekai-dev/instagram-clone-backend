import { IsString } from 'class-validator'

export class PostDto {
	@IsString()
	description: string

	@IsString()
	imagePath: string
}
