using System.Net;
using System.Net.Mail;

namespace MRC_API.Services;

public class SmtpEmailSender : IEmailSender
{
    private readonly IConfiguration _configuration;

    public SmtpEmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendAsync(string toEmail, string subject, string bodyText)
    {
        var host = _configuration["Smtp:Host"];
        var from = _configuration["Smtp:FromEmail"];
        var username = _configuration["Smtp:Username"];
        var password = _configuration["Smtp:Password"];
        var portRaw = _configuration["Smtp:Port"];
        var useSslRaw = _configuration["Smtp:UseSsl"];

        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(from))
            throw new InvalidOperationException("SMTP configuration is missing. Set Smtp:Host and Smtp:FromEmail.");

        var port = 587;
        if (int.TryParse(portRaw, out var parsedPort) && parsedPort > 0)
            port = parsedPort;

        var useSsl = true;
        if (bool.TryParse(useSslRaw, out var parsedUseSsl))
            useSsl = parsedUseSsl;

        using var message = new MailMessage
        {
            From = new MailAddress(from),
            Subject = subject,
            Body = bodyText,
            IsBodyHtml = false
        };
        message.To.Add(toEmail);

        using var client = new SmtpClient(host, port)
        {
            EnableSsl = useSsl,
            DeliveryMethod = SmtpDeliveryMethod.Network
        };

        if (!string.IsNullOrWhiteSpace(username))
        {
            client.Credentials = new NetworkCredential(username, password ?? string.Empty);
        }

        await client.SendMailAsync(message);
    }
}

