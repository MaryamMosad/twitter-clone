import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }
    async validateUser(username: String, pass: String): Promise<any> {
        const user = await this.userService.userFinder({ where: { username: username } });
        const passwordmatch = await bcrypt.compare(pass, user.password)
        const payload = { username: user.username, sub: user.userId };
        if (!passwordmatch) {
            return new Error('Please enter a valid Password')
        }
        if (user && passwordmatch) {
            const token = this.jwtService.sign(payload);
            return { user, token };
        }
        throw new UnauthorizedException();
    }

    async validateToken(token: string): Promise<any> {
        try {
            const { sub } = this.jwtService.verify(token)
            const user = await this.userService.userFinder({ where: { userId: sub } });
            return { user, isValid: true }
        } catch (err) {
            return { isValid: false };
        }
    }
}
