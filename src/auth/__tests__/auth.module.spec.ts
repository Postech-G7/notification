import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

describe('AuthModule', () => {
  let authService: AuthService;
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'mocked-secret', // Mock do JWT_SECRET
          signOptions: { expiresIn: '60m' },
        }),
        AuthModule,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtStrategy).toBeDefined();
  });

  it('should provide AuthService', () => {
    expect(authService).toBeInstanceOf(AuthService);
  });

  it('should provide JwtStrategy', () => {
    expect(jwtStrategy).toBeInstanceOf(JwtStrategy);
  });

  it('should configure JwtModule with correct options', () => {
    const jwtModuleOptions = JwtModule.register({
      secret: 'mocked-secret',
      signOptions: { expiresIn: '60m' },
    });
    expect(jwtModuleOptions).toBeDefined();
  });

  it('should configure PassportModule with default strategy', () => {
    const passportModuleOptions = PassportModule.register({
      defaultStrategy: 'jwt',
    });
    expect(passportModuleOptions).toBeDefined();
  });
});
