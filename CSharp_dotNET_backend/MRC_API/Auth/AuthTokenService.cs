using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MRC_API.Models;

namespace MRC_API.Auth;

public class AuthTokenService
{
    private readonly SymmetricSecurityKey _accessKey;
    private readonly SigningCredentials _accessSigningCredentials;
    private readonly ECDsa _refreshPrivateKey;
    private readonly ECDsaSecurityKey _refreshPublicKey;
    private readonly SigningCredentials _refreshSigningCredentials;
    private readonly JwtSecurityTokenHandler _tokenHandler = new();
    private readonly string _issuer;
    private readonly string _audience;

    public AuthTokenService(IConfiguration config)
    {
        var accessSecret = config["Auth:AccessTokenSecret"] ?? "dev-only-super-secret-access-token-key-change-me-12345";
        _issuer = config["Auth:Issuer"] ?? "MRC_API";
        _audience = config["Auth:Audience"] ?? "MRC_API_Client";

        _accessKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(accessSecret));
        _accessSigningCredentials = new SigningCredentials(_accessKey, SecurityAlgorithms.HmacSha256);

        _refreshPrivateKey = ECDsa.Create(ECCurve.NamedCurves.nistP256);
        var refreshPrivateSecurityKey = new ECDsaSecurityKey(_refreshPrivateKey);
        _refreshPublicKey = new ECDsaSecurityKey(ECDsa.Create(_refreshPrivateKey.ExportParameters(false)));
        _refreshSigningCredentials = new SigningCredentials(refreshPrivateSecurityKey, SecurityAlgorithms.EcdsaSha256);
    }

    public string Issuer => _issuer;
    public string Audience => _audience;
    public SecurityKey AccessValidationKey => _accessKey;
    public SecurityKey RefreshValidationKey => _refreshPublicKey;

    public DateTime GetAccessTokenExpiryUtc() => DateTime.UtcNow.AddMinutes(30);
    public DateTime GetRefreshTokenExpiryUtc() => DateTime.UtcNow.AddHours(24);

    public string CreateAccessToken(User user, DateTime expiresAtUtc)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}".Trim()),
            new("tokenVersion", user.AccessTokenVersion.ToString())
        };

        var jwt = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: expiresAtUtc,
            signingCredentials: _accessSigningCredentials
        );

        return _tokenHandler.WriteToken(jwt);
    }

    public string CreateRefreshToken(User user, DateTime expiresAtUtc)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("type", "refresh")
        };

        var jwt = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: expiresAtUtc,
            signingCredentials: _refreshSigningCredentials
        );

        return _tokenHandler.WriteToken(jwt);
    }

    public static string HashToken(string token)
    {
        var bytes = Encoding.UTF8.GetBytes(token);
        var hash = SHA256.HashData(bytes);
        return Convert.ToHexString(hash);
    }
}

