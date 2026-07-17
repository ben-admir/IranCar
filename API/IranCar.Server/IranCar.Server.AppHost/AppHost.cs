var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.IranCar_Server>("irancar-server");

builder.Build().Run();
