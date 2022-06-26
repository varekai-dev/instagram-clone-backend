import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-facebook'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('CLIENT_ID_FB'),
			clientSecret: configService.get('CLIENT_SECRET_FB'),
			callbackURL: configService.get('FACEBOOK_REDIRECT'),
			scope: 'email',
			profileFields: ['emails', 'name', 'picture.type(large)'],
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (err: any, user: any, info?: any) => void
	): Promise<any> {
		const { name, emails, photos } = profile
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			avatarPath: photos[0].value || undefined,
		}
		const payload = {
			user,
		}

		done(null, payload)
	}
}
