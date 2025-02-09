import { Test } from '@nestjs/testing';
import { JwtStrategy } from '../jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  // Mock da variável de ambiente JWT_SECRET
  beforeAll(() => {
    process.env.JWT_SECRET = 'mocked-secret';
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('constructor', () => {
    it('should configure JWT strategy with correct options', () => {
      const superSpy = jest.spyOn(PassportStrategy.prototype, 'super');
      new JwtStrategy(); // Recria a instância para capturar o spy

      expect(superSpy).toHaveBeenCalledWith({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
      });
    });
  });

  describe('validate', () => {
    it('should return user object with userId and username', async () => {
      const payload = { sub: '123', username: 'testuser' };
      const result = await jwtStrategy.validate(payload);

      expect(result).toEqual({ userId: '123', username: 'testuser' });
    });

    it('should throw an error if payload is invalid', async () => {
      const invalidPayload = null;

      await expect(jwtStrategy.validate(invalidPayload)).rejects.toThrow();
    });
  });
});
