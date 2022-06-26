import { IsString, MaxLength } from 'class-validator'

export class createCommentDto {
	@MaxLength(2200, {
		message: 'Content must be at most 2200 characters',
	})
	@IsString()
	content: string

	@IsString()
	postId: string
}
