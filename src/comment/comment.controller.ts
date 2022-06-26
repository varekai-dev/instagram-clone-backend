import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorators'
import { CommentService } from './comment.service'
import { createCommentDto } from './dto/createCommentDto'

@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	@Auth()
	async createComment(
		@User('_id') _id: Types.ObjectId,
		@Body() dto: createCommentDto
	) {
		return this.commentService.createComment(_id, dto)
	}

	@Auth()
	@Delete('/:commentId')
	async deleteComment(
		@User('_id') _id: Types.ObjectId,
		@Param('commentId') commentId: Types.ObjectId
	) {
		return this.commentService.deleteComment(_id, commentId)
	}
}
