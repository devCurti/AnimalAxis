using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimalAxis.Migrations
{
    /// <inheritdoc />
    public partial class AnimalAxis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cor",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Raca",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Raca", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TipoMedicamento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoMedicamento", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Medicamento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TipoMedicamentoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicamento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medicamento_TipoMedicamento_TipoMedicamentoId",
                        column: x => x.TipoMedicamentoId,
                        principalTable: "TipoMedicamento",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Pet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pedigree = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sexo = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    RacaId = table.Column<int>(type: "int", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PaiId = table.Column<int>(type: "int", nullable: true),
                    MaeId = table.Column<int>(type: "int", nullable: true),
                    CorId = table.Column<int>(type: "int", nullable: false),
                    PeriodoDaCruza = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataDoCio = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pet_Cor_CorId",
                        column: x => x.CorId,
                        principalTable: "Cor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pet_Pet_MaeId",
                        column: x => x.MaeId,
                        principalTable: "Pet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pet_Pet_PaiId",
                        column: x => x.PaiId,
                        principalTable: "Pet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pet_Raca_RacaId",
                        column: x => x.RacaId,
                        principalTable: "Raca",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pet_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Nascimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaiId = table.Column<int>(type: "int", nullable: true),
                    MaeId = table.Column<int>(type: "int", nullable: true),
                    Observacao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    numFilhotes = table.Column<int>(type: "int", nullable: false),
                    PrevisaoNascimento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nascimento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Nascimento_Pet_MaeId",
                        column: x => x.MaeId,
                        principalTable: "Pet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Nascimento_Pet_PaiId",
                        column: x => x.PaiId,
                        principalTable: "Pet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Nascimento_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistroMedicamento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataAplicacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Dose = table.Column<int>(type: "int", nullable: true),
                    PetId = table.Column<int>(type: "int", nullable: false),
                    MedicamentoId = table.Column<int>(type: "int", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistroMedicamento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistroMedicamento_Medicamento_MedicamentoId",
                        column: x => x.MedicamentoId,
                        principalTable: "Medicamento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistroMedicamento_Pet_PetId",
                        column: x => x.PetId,
                        principalTable: "Pet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistroMedicamento_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistroReprodutivo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FemeaId = table.Column<int>(type: "int", nullable: false),
                    MachoId = table.Column<int>(type: "int", nullable: false),
                    DataDoCio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PeriodoDeCruz = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistroReprodutivo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistroReprodutivo_Pet_FemeaId",
                        column: x => x.FemeaId,
                        principalTable: "Pet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistroReprodutivo_Pet_MachoId",
                        column: x => x.MachoId,
                        principalTable: "Pet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistroReprodutivo_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Medicamento_TipoMedicamentoId",
                table: "Medicamento",
                column: "TipoMedicamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Nascimento_MaeId",
                table: "Nascimento",
                column: "MaeId");

            migrationBuilder.CreateIndex(
                name: "IX_Nascimento_PaiId",
                table: "Nascimento",
                column: "PaiId");

            migrationBuilder.CreateIndex(
                name: "IX_Nascimento_UsuarioId",
                table: "Nascimento",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Pet_CorId",
                table: "Pet",
                column: "CorId");

            migrationBuilder.CreateIndex(
                name: "IX_Pet_MaeId",
                table: "Pet",
                column: "MaeId");

            migrationBuilder.CreateIndex(
                name: "IX_Pet_PaiId",
                table: "Pet",
                column: "PaiId");

            migrationBuilder.CreateIndex(
                name: "IX_Pet_RacaId",
                table: "Pet",
                column: "RacaId");

            migrationBuilder.CreateIndex(
                name: "IX_Pet_UsuarioId",
                table: "Pet",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroMedicamento_MedicamentoId",
                table: "RegistroMedicamento",
                column: "MedicamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroMedicamento_PetId",
                table: "RegistroMedicamento",
                column: "PetId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroMedicamento_UsuarioId",
                table: "RegistroMedicamento",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroReprodutivo_FemeaId",
                table: "RegistroReprodutivo",
                column: "FemeaId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroReprodutivo_MachoId",
                table: "RegistroReprodutivo",
                column: "MachoId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroReprodutivo_UsuarioId",
                table: "RegistroReprodutivo",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Nascimento");

            migrationBuilder.DropTable(
                name: "RegistroMedicamento");

            migrationBuilder.DropTable(
                name: "RegistroReprodutivo");

            migrationBuilder.DropTable(
                name: "Medicamento");

            migrationBuilder.DropTable(
                name: "Pet");

            migrationBuilder.DropTable(
                name: "TipoMedicamento");

            migrationBuilder.DropTable(
                name: "Cor");

            migrationBuilder.DropTable(
                name: "Raca");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
