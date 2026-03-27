import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { AuthAuthorizedService } from './auth-authorized.service'
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { Users } from 'src/common/decorators/user.decorator'
import {
  GetMeResponseDto,
  LogoutResponseDto,
  EditRequestDto,
} from './dto/auth.authorized.dto'
import { ResponseFailedDto } from 'src/libs/dto'

@UseGuards(AuthGuard)
@Controller('authorized/auth')
@ApiTags('Auth Authorized')
@ApiBearerAuth()
export class AuthAuthorizedController {
  constructor(private readonly authAuthorizedService: AuthAuthorizedService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiBadRequestResponse({
    type: ResponseFailedDto,
    description: 'User not found',
  })
  @ApiOkResponse({ type: GetMeResponseDto, description: 'User found' })
  async getMeController(@Users() users: Auth.UserPayload) {
    return this.authAuthorizedService.getMeService(users)
  }

  @Patch('me')
  @ApiOperation({ summary: 'Edit user' })
  @ApiBadRequestResponse({
    type: ResponseFailedDto,
    description: 'User not found',
  })
  @ApiOkResponse({
    type: EditRequestDto,
    description: 'Edit user successfully',
  })
  async editController(
    @Users() users: Auth.UserPayload,
    @Body() args: EditRequestDto,
  ) {
    return this.authAuthorizedService.editService(users.id, args)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    type: ResponseFailedDto,
    description: 'User not found',
  })
  @ApiOkResponse({
    type: LogoutResponseDto,
    description: 'Logout successfully',
  })
  async logoutController(@Users() users: Auth.UserPayload) {
    return this.authAuthorizedService.logoutService(users)
  }

  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete current user' })
  @ApiBadRequestResponse({
    type: ResponseFailedDto,
    description: 'User not found',
  })
  @ApiOkResponse({
    type: LogoutResponseDto,
    description: 'Delete user successfully',
  })
  async deleteMeController(@Users() user: Auth.UserPayload) {
    return this.authAuthorizedService.deleteMeService(user.id)
  }
}
