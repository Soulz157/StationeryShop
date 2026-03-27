import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthPublicService } from './auth-public.service'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  LoginResponseDto,
  LoginRequestDto,
  RegisterResponseDto,
  RegisterRequestDto,
} from './dto/auth.public.dto'
import { ResponseFailedDto } from 'src/libs/dto'

@Controller('public/auth')
@ApiTags('Auth Public')
export class AuthPublicController {
  constructor(private readonly authPublicService: AuthPublicService) {}

  @Post('register')
  @ApiOkResponse({
    type: RegisterResponseDto,
    description: 'Register successfully',
  })
  @ApiBadRequestResponse({
    type: ResponseFailedDto,
    description: 'Register failed',
  })
  async registerController(@Body() users: RegisterRequestDto) {
    return this.authPublicService.registerService(users)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'Login successfully',
  })
  @ApiBadRequestResponse({
    type: ResponseFailedDto,
    description: 'Login failed',
  })
  async loginController(@Body() users: LoginRequestDto) {
    return this.authPublicService.loginService(users)
  }
}
