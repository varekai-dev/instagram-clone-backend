import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Get,
	UseGuards,
	Req,
	HttpStatus,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/facebook')
	@UseGuards(AuthGuard('facebook'))
	async facebookLogin(): Promise<any> {
		return 'success'
	}

	@Get('/facebook/redirect')
	@UseGuards(AuthGuard('facebook'))
	async facebookLoginRedirect(@Req() req: any): Promise<any> {
		return this.authService.findAndRegister(req.user.user)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}
}
