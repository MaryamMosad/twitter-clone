import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from 'src/users/dto/AuthPayload';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService
    ) { }
    async validateUser(username: String, pass: String): Promise<any> {
        const user = await this.userService.userFinder(this.userModel, { where: { username: username } });
        const passwordmatch = await bcrypt.compare(pass, user.password)
        const payload = { username: user.username, sub: user.userId };
        if (user && passwordmatch) {
            const token = this.jwtService.sign(payload);
            return { user, token };
        }
        throw new UnauthorizedException();
    }

    async validateToken(token: string): Promise<any> {
        try {
            const { userId } = this.jwtService.verify(token)
            const user = await this.userService.userFinder({ where: { userId: userId } });
            return { user, isValid: true }
        } catch (err) {
            return { isValid: false };
        }
    }
}
