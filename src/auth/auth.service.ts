import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username)
                    if (bcrypt.compareSync(password, user.password)) {
                        const result = {
                            username: user.email,
                            userId: user.id,
                            roles: user.roles,
                        }
                        return result
                    } 
        return null
    }

    async login(user: any) {
            const payload = {
            username: user.username,
            sub: user.userId,
            roles: user.roles,
        };
        return {
            access_token: this.jwtService.sign(payload),
        }
        }
}
