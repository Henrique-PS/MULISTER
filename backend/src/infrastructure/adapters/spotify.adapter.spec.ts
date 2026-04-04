import { SpotifyAdapter } from './spotify.adapter';
import axios from 'axios';

describe('SpotifyAdapter', () => {
  let spotifyAdapter: SpotifyAdapter;
  let axiosPostSpy: jest.SpyInstance;

  beforeEach(() => {
    spotifyAdapter = new SpotifyAdapter();
    process.env.SPOTIFY_CLIENT_ID = 'test_client_id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test_client_secret';
    process.env.SPOTIFY_REDIRECT_URI = 'http://localhost:3000/test-callback';

    axiosPostSpy = jest.spyOn(axios, 'post');
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.SPOTIFY_CLIENT_ID;
    delete process.env.SPOTIFY_CLIENT_SECRET;
    delete process.env.SPOTIFY_REDIRECT_URI;
    axiosPostSpy.mockRestore();
  });

  describe('generateTokens', () => {
    it('should successfully generate tokens with valid code', async () => {
      const mockCode = 'valid_auth_code';
      const mockAccessToken = 'mock_access_token_123';
      const mockRefreshToken = 'mock_refresh_token_456';

      const mockResponse = {
        data: {
          access_token: mockAccessToken,
          refresh_token: mockRefreshToken,
        },
      };

      axiosPostSpy.mockResolvedValueOnce(mockResponse);

      const result = await spotifyAdapter.generateTokens(mockCode);

      expect(axiosPostSpy).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'authorization_code',
          code: mockCode,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ':' +
                process.env.SPOTIFY_CLIENT_SECRET,
            ).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      expect(result).toEqual({
        access_token: mockAccessToken,
        refresh_token: mockRefreshToken,
      });
    });

    it('should handle missing client id environment variable', async () => {
      delete process.env.SPOTIFY_CLIENT_ID;
      const mockCode = 'test_code';

      const mockResponse = {
        data: {
          access_token: 'token',
          refresh_token: 'refresh',
        },
      };

      axiosPostSpy.mockResolvedValueOnce(mockResponse);

      await expect(spotifyAdapter.generateTokens(mockCode)).rejects.toThrow(
        'Missing Spotify credentials: SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET not set',
      );
    });

    it('should handle missing client secret environment variable', async () => {
      delete process.env.SPOTIFY_CLIENT_SECRET;
      const mockCode = 'test_code';

      const mockResponse = {
        data: {
          access_token: 'token',
          refresh_token: 'refresh',
        },
      };

      axiosPostSpy.mockResolvedValueOnce(mockResponse);

      await expect(spotifyAdapter.generateTokens(mockCode)).rejects.toThrow(
        'Missing Spotify credentials: SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET not set',
      );
    });

    it('should handle axios error when fetching tokens', async () => {
      const mockCode = 'invalid_code';
      const mockError = new Error('Network error');

      axiosPostSpy.mockRejectedValueOnce(mockError);

      await expect(spotifyAdapter.generateTokens(mockCode)).rejects.toThrow(
        'Failed to fetch access token from Spotify:',
      );
    });

    it('should handle API error response from Spotify', async () => {
      const mockCode = 'expired_code';
      const mockError = new Error('Invalid authorization code');

      axiosPostSpy.mockRejectedValueOnce(mockError);

      await expect(spotifyAdapter.generateTokens(mockCode)).rejects.toThrow(
        'Failed to fetch access token from Spotify:',
      );
    });

    it('should properly encode credentials in Basic Auth header', async () => {
      const mockCode = 'test_code';
      const mockAccessToken = 'test_token';
      const mockRefreshToken = 'test_refresh';

      const mockResponse = {
        data: {
          access_token: mockAccessToken,
          refresh_token: mockRefreshToken,
        },
      };

      axiosPostSpy.mockResolvedValueOnce(mockResponse);

      await spotifyAdapter.generateTokens(mockCode);

      const expectedAuthHeader = `Basic ${Buffer.from(
        'test_client_id:test_client_secret',
      ).toString('base64')}`;

      const expectedConfig = {
        headers: {
          Authorization: expectedAuthHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      expect(axiosPostSpy).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.objectContaining({
          grant_type: 'authorization_code',
          code: mockCode,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        }),
        expectedConfig,
      );
    });

    it('should handle empty code parameter', async () => {
      const mockCode = '';

      const mockError = new Error('Code parameter is required');

      axiosPostSpy.mockRejectedValueOnce(mockError);

      await expect(spotifyAdapter.generateTokens(mockCode)).rejects.toThrow(
        'Failed to fetch access token from Spotify:',
      );
    });

    it('should verify axios post was called exactly once', async () => {
      const mockCode = 'test_code';
      const mockResponse = {
        data: {
          access_token: 'token',
          refresh_token: 'refresh',
        },
      };

      axiosPostSpy.mockResolvedValueOnce(mockResponse);

      await spotifyAdapter.generateTokens(mockCode);

      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle special characters in code parameter', async () => {
      const mockCode = 'code_with_special_!@#$%_chars';
      const mockResponse = {
        data: {
          access_token: 'special_token',
          refresh_token: 'special_refresh',
        },
      };

      axiosPostSpy.mockResolvedValueOnce(mockResponse);

      const result = await spotifyAdapter.generateTokens(mockCode);

      expect(axiosPostSpy).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.objectContaining({
          code: mockCode,
        }),
        expect.any(Object),
      );
      expect(result).toEqual({
        access_token: 'special_token',
        refresh_token: 'special_refresh',
      });
    });

    it('should handle null response data gracefully', async () => {
      const mockCode = 'test_code';

      axiosPostSpy.mockResolvedValueOnce({ data: null });

      await expect(spotifyAdapter.generateTokens(mockCode)).rejects.toThrow(
        'Failed to fetch access token from Spotify:',
      );
    });
  });
});
