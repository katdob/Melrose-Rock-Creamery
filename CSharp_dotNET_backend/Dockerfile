# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy MRC_API project and restore
COPY MRC_API/MRC_API.csproj MRC_API/
RUN dotnet restore MRC_API/MRC_API.csproj

# Copy MRC_API source and build
COPY MRC_API/ MRC_API/
RUN dotnet publish MRC_API/MRC_API.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage (ASP.NET Core)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "MRC_API.dll"]
