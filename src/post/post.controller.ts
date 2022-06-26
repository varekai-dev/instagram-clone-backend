import {
	Body,
	Controller,
	Get,
	Post,
	HttpCode,
	ValidationPipe,
	Param,
	Delete,
} from '@nestjs/common'
import { PostService } from './post.service'
import { UsePipes } from '@nestjs/common'
import { User } from 'src/user/decorators/user.decorators'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { PostDto } from './dto/post.dto'
@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	@HttpCode(200)
	async getAllPosts() {
		return this.postService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@Post('post')
	@HttpCode(200)
	@Auth()
	async makePost(@User('_id') _id: string, @Body() dto: PostDto) {
		return this.postService.makePost(_id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Delete(':postId')
	@HttpCode(200)
	@Auth()
	async deletePost(@Param('postId') postId: string, @User('_id') _id: string) {
		return this.postService.deletePost(postId, _id)
	}
}
