# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

# Set working directory
WORKDIR /src

# Copy project file
COPY *.csproj ./

# Restore dependencies
RUN dotnet restore

# Copy source code
COPY . ./

# Build the application
RUN dotnet build -c Release -o /app/build

# Publish the application
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/runtime:10.0 AS runtime

# Set working directory
WORKDIR /app

# Copy published application from build stage
COPY --from=build /app/publish .

# Expose port (if needed for future web API conversion)
EXPOSE 8080

# Set entry point
ENTRYPOINT ["dotnet", "Csharp_dotNET_backend.dll"]
