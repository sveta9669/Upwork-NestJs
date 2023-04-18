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
        const user = await this.usersService.findOneByEmail(username);
        // if (user) {
        //     if (user.blocktime < new Date()) {
        //         if (user.count < 3) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const result = {
                            username: user.email,
                            userId: user.id,
                            roles: user.roles,
                        };
                        // await this.usersService.userUp(user.id, 0)
                        // await this.usersService.userUp(user.id, { blocktime: 0 })
                        return result;
                    } 
                    // else {
                    //     await this.usersService.userUp(user.id, { count: user.count + 1 })
                    //     console.log(user.count);
                    //     return "Worng Password"
                    // }
            //     } else {
            //         if (user.count == 3) {
            //             const date = new Date()
            //             date.setDate(date.getDate() + 1)
            //             console.log(date);
            //             await this.usersService.userUp(user.id, { blocktime: date })
            //             return "Your account Block"
            //         }
            //     }
            // } else {
            //     return "Your account Blocked"
            // }
        // }
        return null;
    }

    async login(user: any) {
        // if(user){
        //     return user
        // } else {
            const payload = {
            username: user.username,
            sub: user.userId,
            roles: user.roles,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
        }
        
        
    // }

}
