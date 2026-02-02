namespace MRC_API.Endpoints;

public static class TestEndpoint
{
    public static IEndpointRouteBuilder MapFirstApi(this IEndpointRouteBuilder app)
    {
        app.MapGet("/first", () => "testing 1 2 3 do re mi")
            .WithName("TestEndpoint")
            .Produces<string>(200);

        return app;
    }
}
